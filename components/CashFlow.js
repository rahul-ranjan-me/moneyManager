import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    AsyncStorage,
} from 'react-native';
import clrs from '../utils/Clrs';
import cashFlowData from '../utils/CashFlow';
import { 
    Icon, 
    Grid,
    Row,
    Col,
    CheckBox,
} from 'react-native-elements';
import {icons} from '../utils/icons'
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { hardwareBackPress } from 'react-native-back-android';
import PageFooter from '../reusable-components/PageFooter';
import _ from 'lodash';

const {height, width} = Dimensions.get('window');

let isAggregated = null

class CashFlow extends Component {
    constructor(props){
        super(props);
        this.totalAccounts = 0;
        this.currentCursor = 0;
        this.transactionCalculatedData = [];
        this.getPreferences = this.getPreferences.bind(this);
        this.attributesXhr = {
			method: 'GET',
			headers : this.props.headers,
			body:null
		};
        this.state = {
            transactionData:{}
        }
        this.myPreferences = {}
        isAggregated = this.props.transactions ? false : true
    }

    calcTransactionPromise(allAccounts){
        if(this.currentCursor < this.totalAccounts){
            fetch('https://bluebank.azure-api.net/api/v0.7/accounts/'+allAccounts[this.currentCursor].id+'/transactions', this.attributesXhr)
            .then((response) => response.json())
            .then((responseJson) => {
                this.transactionCalculatedData = this.transactionCalculatedData.concat(responseJson.results);
                if(this.currentCursor === this.totalAccounts-1){
                    this.calcTransactions(this.transactionCalculatedData, 'Aggregated last year view...');
                }else{
                    this.currentCursor += 1;
                    this.calcTransactionPromise(allAccounts);
                }
                
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }

    getPreferences(){
        try {
            AsyncStorage.getItem('preferences').then((value) => {
                if (value !== null){
                    this.myPreferences = value ? JSON.parse(value) : {}
                }
            })
        } catch (error) {
            console.log('error', error)
            // Error retrieving data
        }        
    }
 
    componentDidMount(){
        this.setState({'visible':true})
        this.getPreferences();
        if(this.props.transactions){
            this.calcTransactions(this.props.transactions.results, 'Last  year..');
        }else{
            var transactionsCalc = [];
            fetch('https://bluebank.azure-api.net/api/v0.7/customers/'+this.props.customerInfo.id+'/accounts', this.attributesXhr)
            .then((response) => response.json())
            .then((responseJson) => {
                const allAccounts = responseJson.results;
                this.totalAccounts = allAccounts.length;
                this.calcTransactionPromise(allAccounts)
            })
            .catch((error) => {
                this.setState({'visible':false});
                alert('Some error occured fetching data');
                console.error(error)
            })
        }
    }

    calcTransactions = (transactions, subtitle) => {
        fetch('https://frozen-cliffs-20193.herokuapp.com/', {
            method: 'POST',
            body:JSON.stringify({
                results: transactions
            }),
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
            .then((responseJson) => {
                this.setState({transactionData: responseJson, visible:false, subtitle: subtitle})
            })
            .catch((error) => {
                console.error(error)
            })
        .catch((error) => {
            console.error(error)
        })
    }

    calcIncomeExpenseBiggestItem(type){
        var incomeAmount = 0,
            expenseAmount = 0,
            biggestItem = 0,
            groups = this.state.transactionData;
        if(this.state.transactionData){
            
            for(var i in groups){
                if(groups[i].amount > 0){
                    incomeAmount += groups[i].amount;
                }else{
                    expenseAmount -= groups[i].amount;
                }
                if(Math.abs(groups[i].amount) > biggestItem){
                    biggestItem = groups[i].amount;
                }
            }
        }
        return {
            incomeAmount : Math.abs(incomeAmount).toFixed(2),
            expenseAmount : Math.abs(expenseAmount).toFixed(2),
            biggestItem : biggestItem
        }
    }

    getDetails(data, type){
        this.props.setAllTransaction({key:data.label, label:data.label, transactions:data.transactions, cashFlow:this.props.transactions?true:false});
        this.props.navigator.replace({id: 'statement'});
        return;
    }

    createIncomeChart(data, type, biggestItem, key){
        data.amount = Math.abs(data.amount);
        const totalWidth = parseInt(data.amount)/biggestItem*100
        adjustedWidth = ((Math.round(width*totalWidth/100))*60/100)+30

        const adjustedWidthExpenses = parseInt(data.amount)/parseInt(this.myPreferences[data.label])*100,
            adjustedWidthToApplyExpenses = adjustedWidthExpenses*(width-55)/100,
            isShowExpenses = this.state.showExpense && type!=='income' && data.label && this.myPreferences[data.label]
        

        let color = '';
        if(type==='income'){
            color = clrs.incomeColor
            colorText = clrs.expenseColor
        }else{
            color = clrs.expenseColor
            colorText = clrs.incomeColor
        }
        const getData = (data) => {
            this.getDetails(data, type);
        }

        return [
        <Grid key={key} onPress={() => {getData(data)}}>
            <Col>
                <View style={{marginLeft:15, marginTop:10, flex:1, flexDirection:'column'}} onPress={() => {getData(data)}}>
                    <View style={{height:70, marginLeft:10, backgroundColor:clrs.secondaryWhiteText, marginTop:-50, width:5,}}><Text style={{height:50, width:5}}></Text></View>
                        <View>
                            <Grid>
                                <View style={{width:40, height:50, borderRadius:50, backgroundColor:color, position:'relative', zIndex:2, marginTop:-10}}>
                                    <View style={{position:'absolute', zIndex:6, width:30, height:30, borderRadius:50, marginTop:8, marginLeft:5, paddingTop:5, backgroundColor:clrs.textPrimaryColor}}>
                                    <Icon
                                        name={icons[data.label]?icons[data.label]:icons['Other Account Transfer']}
                                        type='font-awesome'
                                        size={20}
                                        
                                        color={color} />
                                    </View>
                                </View>
                            
                                <View style={{left:20, position:'absolute'}}>
                                    <View style={{width:width-55, marginTop:-5, borderBottomRightRadius:10, borderTopRightRadius:10, height:40, backgroundColor: isShowExpenses ? clrs.widgetBackgroundColor : 'rgba(0,0,0,0)'}}>
                                    </View>
                                    <View style={{position:'absolute', zIndex:7, right:10, top:-5}}>
                                        { isShowExpenses ? 
                                            <View>
                                                <Text style={{color:clrs.black, fontWeight:'bold'}}>Limit</Text>
                                                <Text style={{color:clrs.textPrimaryColor}}>{this.myPreferences[data.label]}</Text>
                                            </View> : undefined
                                        }
                                    </View>
                                    <View style={{height:40, marginTop:-5, position:'absolute', left:14, zIndex:4, width: isShowExpenses ? adjustedWidthToApplyExpenses : adjustedWidth, backgroundColor:color, borderBottomRightRadius:10, borderTopRightRadius:10}}>
                                    </View>
                                
                                    <View style={{marginTop:-5, marginLeft:5, position:'absolute', left:25, zIndex:5, width:width-200}}>
                                        <Text style={{fontSize:20, color:colorText, fontSize:14}}>£ {data.amount.toFixed(2)}</Text>
                                        <Text style={{fontWeight:'bold', color:clrs.primaryWhiteText}}>{data.label ? data.label: 'Others'}</Text>
                                    </View>
                                   
                                </View>

                            </Grid>
                        </View>
                </View>
            </Col>
        </Grid>
        ]
    }

    callIncomeExpenseChart(key, i, type, biggestItem){
        const groups = _.cloneDeep(this.state.transactionData);
        if(type ==='income' && groups[key].amount > 0){
            return this.createIncomeChart(groups[key], type, biggestItem, i)
        }else if(type ==='expense' && groups[key].amount < 1){
            return this.createIncomeChart(groups[key], type, biggestItem, i)
        }
        return undefined;
    }

    toogleExpense(){
        this.setState({showExpense: !this.state.showExpense})
    }

    render() {
        const {incomeAmount, expenseAmount, biggestItem} = this.calcIncomeExpenseBiggestItem();
        const groups = this.state.transactionData;

        return(
             <LinearGradient 
                start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
                locations={[0,.7,0.9]}
                colors={clrs.pageArrayBackgroundColor} style={styles.page}>
                
                <Text style={styles.pageLabel}>CASH FLOW</Text>
                <Text style={styles.pageSubLabel}>({this.state.subtitle})</Text>
                <View style={{height:80, backgroundColor:clrs.blackBackgroundWithOpacity, borderRadius:10, margin:15, padding:15}}>
                    <Grid>
                    <Col>
                        <Text style={{fontSize:17, color:clrs.primaryWhiteText}}>Income</Text>
                        <Grid>
                        <Text style={{fontSize:24, fontWeight:'bold', color:clrs.incomeColor}}>£ {incomeAmount}</Text>
                        </Grid>
                    </Col>
                    <Col>
                        <View style={{height:50, borderLeftColor:'rgba(255,255,255,.2)', paddingLeft:15, borderLeftWidth:1, borderStyle:'dotted'}}>
                        <Text style={{fontSize:17, color:clrs.primaryWhiteText}}>Expense</Text>
                        <Grid>
                            <Text style={{fontSize:24, fontWeight:'bold', color:clrs.expenseColor}}>£ {expenseAmount}</Text>
                        </Grid>
                        </View>
                    </Col>
                    </Grid>
                </View>
                <CheckBox
                    style={{marginTop:-5, marginBottom:5, backgroundColor:'rgba(0,0,0,.5)', padding:10, margin:15, borderRadius:10}}
                    textStyle = {{color:clrs.primaryWhiteText}}
                    title='See expenses against limits'
                    onPress={this.toogleExpense.bind(this)}
                    checked={this.state.showExpense}
                    />
                <ScrollView>
                    {Object.keys(groups).map((key, i) => {return this.callIncomeExpenseChart(key, i , 'income', biggestItem)})}
                    {Object.keys(groups).map((key, i) => {return this.callIncomeExpenseChart(key, i , 'expense', biggestItem)})}
                </ScrollView>
                <Spinner visible={this.state.visible} textContent={"Fetching cashflow ..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
                <PageFooter />
            </LinearGradient>
        )
    }
}

const handleBackButtonPress = ({ navigator }) => {
    isAggregated ? navigator.replace({id: 'home'}) : navigator.replace({id: 'accounts'});
    navigator.pop();
    return true;
};
const cashflow = hardwareBackPress(CashFlow, handleBackButtonPress);

export default cashflow;

const styles = StyleSheet.create({
  page: {
      flex: 1,
      //alignItems: 'center',
      flexDirection:'column',
  },
  pageLabel:{
    color:clrs.primaryWhiteText,
    fontSize:16,
    alignSelf:'center',
    textShadowColor:'#000',
    marginTop:15,
	textShadowOffset:{width:1, height:1}
  },
  pageSubLabel:{
    color:clrs.secondaryWhiteText,
    fontSize:14,
    alignSelf:'center',
  },
  

});