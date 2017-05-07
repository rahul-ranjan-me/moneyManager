import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import clrs from '../utils/Clrs';
import cashFlowData from '../utils/CashFlow';
import { 
	Icon, 
	SocialIcon,
	ButtonGroup,
  Grid,
  Row,
  Col,
  Button,
  Divider,
} from 'react-native-elements';
import {GoogleSignin} from 'react-native-google-signin';
import {labels, categoryCashFlow} from '../utils/cashFlowKey'
import Spinner from 'react-native-loading-spinner-overlay';
import { hardwareBackPress } from 'react-native-back-android';

const calcTransactions = (transactions) => {
  let data = {
    incomeData : {},
    expenseData : {},
    income: 0,
    expense: 0,
    incomeArrData:[],
    expenseArrData:[]
  }
  const unclassified = (category1stLevel, category2ndLevel, label, tran) => {

    tran.transactionAmount > 0 ? data.income += tran.transactionAmount : data.expense += Math.abs(tran.transactionAmount);

    if(data[category1stLevel][category2ndLevel]){
      data[category1stLevel][category2ndLevel].amount += Math.abs(tran.transactionAmount);
    }else{
      data[category1stLevel][category2ndLevel] = {
          label:label.label,
          amount:tran.transactionAmount,
          icon:label.icon?label.icon:'money'
      }
    }
  };

  transactions.forEach((tran) => {
    
    if(!tran.transactionType){    
      if(tran.transactionAmount > 0){
        if(data.incomeData['salary']){
          data.incomeData['salary'].amount += tran.transactionAmount;
        }else{
          data.incomeData['salary'] = {
            label: labels['salary'].label.label,
            amount:tran.transactionAmount,
            icon:'credit-card'
          }
        }
        data.income += tran.transactionAmount;
      }
    }else{
      const is2ndLevel = categoryCashFlow[tran.transactionType].is2ndLevel;
      
      if(!tran.transactionType){
        unclassified('incomeData', 'salary', 'Salary', tran);
        return;
      }

      if(!categoryCashFlow[tran.transactionType]){
        tran.transactionAmount > 0 ? unclassified('incomeData', 'others', 'Other Income', tran) : unclassified('expenseData', 'others', 'Other Expense', tran);
      }else{
        let category2ndLevel = '',
            category1stLevel = tran.transactionAmount > 0 ? 'incomeData' : 'expenseData';
        if(is2ndLevel){
          if(!categoryCashFlow[tran.transactionType][tran.transactionDescription]){
            category2ndLevel = 'others';  
            labels[category2ndLevel] = category1stLevel === 'incomeData' ? 'Other Income' : 'Other Expense';
          }else{
            category2ndLevel = categoryCashFlow[tran.transactionType][tran.transactionDescription].category;
          }
        }else{
           if(!categoryCashFlow[tran.transactionType]){
            category2ndLevel = 'others';  
            labels[category2ndLevel] = category1stLevel === 'incomeData' ? 'Other Income' : 'Other Expense';
          }else{
            category2ndLevel = categoryCashFlow[tran.transactionType].category;
          }

          
        }
        unclassified(category1stLevel, category2ndLevel, labels[category2ndLevel], tran);
      }
      

    }

  });
  
  for(var i in data.incomeData){
    data.incomeArrData.push(data.incomeData[i]);
  }

  for(var i in data.expenseData){
    data.expenseArrData.push(data.expenseData[i]);
  }
  return data;
}

const {height, width} = Dimensions.get('window');

class CashFlow extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactionData : {
        incomeData : {},
        expenseData : {},
        income: 0,
        expense: 0,
        incomeArrData:[],
        expenseArrData:[]
      },
      visible: false
    };
    this.attributesXhr = {
			method: 'GET',
			headers : this.props.headers,
			body:null
		};
    this.totalAccounts = 0;
    this.currentCursor = 0;
    this.transactionCalculatedData = [];
  }

  calcTransactionPromise(allAccounts){
    if(this.currentCursor < this.totalAccounts){
      fetch('https://bluebank.azure-api.net/api/v0.7/accounts/'+allAccounts[this.currentCursor].id+'/transactions', this.attributesXhr)
      .then((response) => response.json())
        .then((responseJson) => {
          this.transactionCalculatedData = this.transactionCalculatedData.concat(responseJson.results);
          if(this.currentCursor === this.totalAccounts-1){
            this.setState({transactionData: calcTransactions(this.transactionCalculatedData), visible: false, subtitle: 'Aggregated last year view...'});
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

  componentDidMount(){
    this.setState({visible:true});
    if(this.props.transactions){
      this.setState({transactionData: calcTransactions(this.props.transactions.results), visible:false, subtitle: 'Last year...'})
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
          this.setState({'visible':true});
          alert('Some error occured fetching data');
          console.error(error)
        })
    }
  }

  calcBiggestHeight(array1, array2){
    const allItems = array1.concat(array2);
    let biggestItem = 0;
    for(var i = 0; i<allItems.length; i++){
      if(parseInt(allItems[i].amount) > biggestItem){
        biggestItem = parseInt(allItems[i].amount);
      }
    }
    return biggestItem
  }

  createIncomeChart(data, type, biggestItem){
    const totalWidth = parseInt(data.amount)/biggestItem*100
      adjustedWidth = ((Math.round(width*totalWidth/100))*60/100)+30,
      color = type === 'income'? clrs.linkButtonColor : clrs.expenseColor;

    return [
      <View style={{marginLeft:15, marginTop:10, flex:1, flexDirection:'column'}}>
        <View style={{height:50, marginLeft:10, backgroundColor:'#666', marginTop:-10, width:5,}}><Text style={{height:50, width:5}}></Text></View>
        <View>
          <Grid>
          
              <View style={{width:40, height:40, borderRadius:50, backgroundColor:color, position:'relative', zIndex:2, marginTop:-5}}>
                <View style={{width:30, height:30, borderRadius:50, marginTop:5, marginLeft:5, paddingTop:5, backgroundColor:clrs.textPrimaryColor}}>
                  <Icon
                    name={data.icon}
                    type='font-awesome'
                    size={20}
                    color={color} />
                </View>
              </View>
           
              <View style={{left:20, position:'absolute'}}>
                <Grid>
                  <Col>
                    <View style={{height:30, width:adjustedWidth, backgroundColor:color, borderBottomRightRadius:10, borderTopRightRadius:10}}>
                    </View>
                  </Col>
                  <Col>
                    <View style={{marginTop:-10, marginLeft:5}}>
                      <Text style={{fontSize:20, color:color}}>{data.amount.toFixed(2)}</Text>
                      <Text style={{fontWeight:'bold'}}>{data.label}</Text>
                    </View>
                  </Col>
                </Grid>
              </View>

              
          </Grid>
        </View>
      </View>
    ]
  }

  render() {
    const {income, expense, incomeArrData, expenseArrData} = this.state.transactionData;
    const biggestItem = this.calcBiggestHeight(incomeArrData, expenseArrData);
    const incomeChart = incomeArrData.map((data) => this.createIncomeChart(data, 'income', biggestItem))
    const expenseChart = expenseArrData.map((data) => this.createIncomeChart(data, 'expense', biggestItem))
    //const user = GoogleSignin.currentUser();

    return (
      <View style={styles.page}>

        <View style={styles.pageHeader}>
          {/*<Image
            style={{width: 50, height: 50, borderRadius:10, position:'absolute', right:10, top:5}}
            source={{uri: user.photo}}
          />*/}
          <Text style={styles.headerText}>Cashflow</Text>
          <Text>({this.state.subtitle})</Text>
        </View>

        <ScrollView>
          <View style={{ backgroundColor:clrs.textPrimaryColor, borderRadius:10, margin:15, padding:15}}>
            <Grid>
              <Col>
                <Text style={{fontSize:20}}>Income</Text>
                <Grid>
                  <Text style={{fontSize:24, fontWeight:'bold', color:clrs.linkButtonColor}}>£ {income.toFixed(2)}</Text>
                </Grid>
              </Col>
              <Col>
                <View style={{borderLeftColor:'#333', paddingLeft:15, borderLeftWidth:1, borderStyle:'dotted'}}>
                  <Text style={{fontSize:20}}>Expense</Text>
                  <Grid>
                    <Text style={{fontSize:24, fontWeight:'bold', color:clrs.expenseColor}}>£ {expense.toFixed(2)}</Text>
                  </Grid>
                </View>
              </Col>
            </Grid>
          </View>

          {incomeChart}
          {expenseChart}

          <View style={styles.pageFooter}>
            <Text style={styles.footerText}>All rights reserved</Text>
          </View>
        </ScrollView>
        <Spinner visible={this.state.visible} textContent={"Fetching cashflow ..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
      </View>
    );    
  }
}

const handleBackButtonPress = ({ navigator }) => {
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
      backgroundColor: clrs.pageBackgroundColor
  },
  pageHeader:{
    backgroundColor:clrs.primaryColor,
    padding:15,
    marginTop:1,
    alignItems:'center'
  },
  headerText:{
    fontSize:24,
    color: clrs.textPrimaryColor,
    fontWeight:'bold'
  },
  pageFooter:{
    backgroundColor:clrs.darkPrimaryColor,
    padding:10,
    marginTop:15,
    alignItems:'center'
  },
  footerText:{
    fontSize:20,
    color: clrs.textPrimaryColor
  },
  

});