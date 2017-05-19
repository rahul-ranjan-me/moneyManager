import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import clrs from '../utils/Clrs';
import accountData from '../utils/Accounts';
import { 
	Icon, 
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Pie} from 'react-native-pathjs-charts';
import pieOptions from '../utils/DashboardPie';
import Spinner from 'react-native-loading-spinner-overlay';
import { hardwareBackPress } from 'react-native-back-android';
import PageFooter from '../reusable-components/PageFooter';

const {height, width} = Dimensions.get('window');

class Home extends Component {
  constructor(props){
    super(props);
    this.showCashFlow = this.showCashFlow.bind(this);
    this.attributesXhr = {
			method: 'GET',
			headers : this.props.headers,
			body:null
		};
    this.accountPie = {
      expenses: 0,
      salary: 0,
      otherIncome: 0
    }
    this.state = {
      'accounts':[],
      'accountPie' : {
        expenses: 0,
        salary: 0,
        otherIncome: 0
      },
      'accountPieData': []
    }
  }

  componentDidMount(){
    this.setState({visible:true});
    fetch('https://bluebank.azure-api.net/api/v0.7/customers/'+this.props.customerInfo.id+'/accounts', this.attributesXhr)
    .then((response) => response.json())
			.then((responseJson) => {
				this.setState({'accounts':responseJson.results});
        fetch('https://bluebank.azure-api.net/api/v0.7/accounts/'+this.props.accountId+'/transactions', this.attributesXhr)
          .then((response) => response.json())
          .then((responseJson) => {
            this.props.setTransactions(responseJson);
            responseJson.results.map((transaction)=>{
              if(transaction.transactionAmount < 0){
                this.accountPie.expenses += transaction.transactionAmount;
              }else{
                if(transaction.transactionAmount > 0 && transaction.transactionDescription === 'Salary'){
                  this.accountPie.salary += transaction.transactionAmount;
                }else{
                  this.accountPie.otherIncome += transaction.transactionAmount;
                }
              }
            })
            let totalAmount = Math.abs(this.accountPie.expenses)+this.accountPie.salary+this.accountPie.otherIncome;
            //this.state.accountPie = this.accountPie;
            this.setState({'accountPie':this.accountPie});
            this.setState({
              'accountPieData' : [
                {
                  'name' : 'Expenses ('+ (Math.abs((this.accountPie.expenses/totalAmount)*100)).toFixed(2)+' %)',
                  'population': Math.abs(this.accountPie.expenses)
                },
                {
                  'name' : 'Salary ('+ ((this.accountPie.salary/totalAmount)*100).toFixed(2)+' %)',
                  'population': Math.abs(this.accountPie.salary)
                },
                {
                  'name' : 'Other Income ('+ ((this.accountPie.otherIncome/totalAmount)*100).toFixed(2)+' %)',
                  'population': Math.abs(this.accountPie.otherIncome)
                }
              ]
            });
            this.setState({visible:false});
          })
          .catch((error) => {
            this.setState({'visible':true});
            alert('Some error occured fetching data');
            console.error(error)
          })
			})
			.catch((error) => {
				console.error(error)
			})
  }

  showCashFlow(){
    this.props.navigator.replace({ id: 'cashFlow' });
  }

  render() {
    return (
      <LinearGradient 
        start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
        locations={[0,.7,0.9]}
        colors={clrs.pageArrayBackgroundColor} style={styles.page}>
        
        <ScrollView>
          
          <Text style={styles.pageLabel}>CASH FLOW</Text>
          <Text style={styles.pageSubLabel}>(Last one year)</Text>
          
          <TouchableOpacity onPress={this.showCashFlow}>
            
            <View style={{marginLeft:((width-350)/2), marginBottom:-30}}>
              <Pie
                data={this.state.accountPieData}
                options={pieOptions}
                accessorKey="population" />
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Salary</Text>
              <Text style={styles.chartLegendText}>£ {this.state.accountPie.salary.toFixed(2)}</Text>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Other Income</Text>
              <Text style={styles.chartLegendText}>£ {this.state.accountPie.otherIncome.toFixed(2)}</Text>
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Expense</Text>
              <Text style={styles.chartLegendText}>£ {Math.abs(this.state.accountPie.expenses).toFixed(2)}</Text>
            </View>

          </TouchableOpacity>
          
        </ScrollView>

        <Spinner visible={this.state.visible} textContent={"Loading account ..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
        <PageFooter />
      </LinearGradient>
    );    
  }
}

const handleBackButtonPress = ({ navigator }) => {
  navigator.replace({id: 'home'});
  navigator.pop();
  return true;
};
const home = hardwareBackPress(Home, handleBackButtonPress);

export default home;

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
  categoryContainer:{
    flexDirection:'row',
    padding:15,
    height:60,
    backgroundColor:clrs.blackBackgroundWithOpacity,
    borderBottomColor:'rgba(255,255,255,.2)',
    borderBottomWidth:1
  },
  categoryLabel:{
    fontSize:15,
    color:clrs.primaryWhiteText
  },
  chartLegendText:{
    fontSize:30,
    position:'absolute',
    right:15,
    marginTop:5,
    color:clrs.textGreenColor,
  },

});