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

const {height, width} = Dimensions.get('window');

export default class CashFlow extends Component {
  constructor(props){
    super(props);
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
      adjustedWidth = (Math.round(width*totalWidth/100))*70/100,
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
                      <Text style={{fontSize:20, color:color}}>{data.amount}</Text>
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
    const {income, expense, incomeData, expenseData} = cashFlowData;
    const biggestItem = this.calcBiggestHeight(incomeData, expenseData);
    const incomeChart = incomeData.map((data) => this.createIncomeChart(data, 'income', biggestItem))
    const expenseChart = expenseData.map((data) => this.createIncomeChart(data, 'expense', biggestItem))
    //const user = GoogleSignin.currentUser();

    return (
      <View style={styles.page}>

        <View style={styles.pageHeader}>
          {/*<Image
            style={{width: 50, height: 50, borderRadius:10, position:'absolute', right:10, top:5}}
            source={{uri: user.photo}}
          />*/}
          <Text style={styles.headerText}>Cash flow</Text>
          <Text>(Apr 2017)</Text>
        </View>

        <ScrollView>
          <View style={{ backgroundColor:clrs.textPrimaryColor, borderRadius:10, margin:15, padding:15}}>
            <Grid>
              <Col>
                <Text style={{fontSize:20}}>Income</Text>
                <Grid>
                  <Text style={{fontSize:24, fontWeight:'bold', color:clrs.linkButtonColor}}>£ {income}</Text>
                </Grid>
              </Col>
              <Col>
                <View style={{borderLeftColor:'#333', paddingLeft:15, borderLeftWidth:1, borderStyle:'dotted'}}>
                  <Text style={{fontSize:20}}>Expense</Text>
                  <Grid>
                    <Text style={{fontSize:24, fontWeight:'bold', color:clrs.expenseColor}}>£ {expense}</Text>
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

      </View>
    );    
  }
}

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