import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import clrs from '../utils/Clrs';
import accountData from '../utils/Accounts';
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
import {Pie} from 'react-native-pathjs-charts';
import pieOptions from '../utils/DashboardPie';
import {GoogleSignin} from 'react-native-google-signin';

const {height, width} = Dimensions.get('window');

export default class Home extends Component {
  constructor(props){
    super(props);
    this.showCashFlow = this.showCashFlow.bind(this);
  }

  bankAccountData(account){
    return[
        <Text style={{color:clrs.textPrimaryColor, fontSize:15}}>{account.bankName}</Text>
      , <View style={styles.horizontalAlign}>
          <Icon
            name='rupee'
            type='font-awesome'
            color={clrs.textGreenColor} />
          <Text style={{color:clrs.textGreenColor, fontSize:20, marginLeft:5, height:50}}>{account.cash}</Text>
        </View>
      ]
  }

  showCashFlow(){
    this.props.navigator.replace({ id: 'cashFlow' });
  }

  render() {
    const {totalCash, bankAccounts, cashInWallet, lastWithdrawal, upComingExpenses, totalExpenses, accountPie} = accountData;
    const renderBankAccounts = bankAccounts.map(this.bankAccountData);
    //const user = GoogleSignin.currentUser();

    return (
      <View style={styles.page}>

        <View style={styles.pageHeader}>
          {/*<Image
            style={{width: 50, height: 50, borderRadius:10, position:'absolute', right:10, top:5}}
            source={{uri: user.photo}}
          />*/}
          <Text style={styles.headerText}>Dashboard</Text>
        </View>

        <ScrollView>
          <View style={{marginLeft:5, marginBottom:-50}}>
            <View style={{flex:1, flexDirection:'column', marginTop:10}}>
              <Text style={{fontSize:20, textAlign:'center', fontWeight:'bold', color:clrs.black, width:width}}>Cash Flow</Text>
              <Text style={{fontSize:14, textAlign:'center', color:clrs.black, width:width, marginBottom:-10}}>(April 2017)</Text>
            </View>
            <Pie
              data={accountPie}
              options={pieOptions}
              accessorKey="population" />
          </View>
          <Grid>
            <Col size={1}>
              <Grid>
                <Col size={1}><View style={{backgroundColor:'#2980B9', width:10, height:10, marginLeft:10}}></View></Col>
                <Col size={4}>
                  <Text style={styles.chartLegendTitle}>Expenses</Text>
                  <Grid>
                    <Col size={1}>
                      <Icon
                        name='rupee'
                        type='font-awesome'
                        size={20}
                        color={clrs.black} />
                    </Col>
                    <Col size={4}>
                      <Text style={styles.chartLegendText}>27000</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
            </Col>
            <Col size={1}>
              <Grid>
                <Col size={1}><View style={{backgroundColor:'#2980B9', width:10, height:10, marginLeft:10}}></View></Col>
                <Col size={4}>
                  <Text style={styles.chartLegendTitle}>Salary</Text>
                  <Grid>
                    <Col size={1}>
                      <Icon
                        name='rupee'
                        type='font-awesome'
                        size={20}
                        color={clrs.black} />
                    </Col>
                    <Col size={4}>
                      <Text style={styles.chartLegendText}>48000</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
            </Col>
            <Col size={1}>
              <Grid>
                <Col size={1}><View style={{backgroundColor:'#2980B9', width:10, height:10, marginLeft:10}}></View></Col>
                <Col size={4}>
                  <Text style={styles.chartLegendTitle}>Other Income</Text>
                  <Grid>
                    <Col size={1}>
                      <Icon
                        name='rupee'
                        type='font-awesome'
                        size={20}
                        color={clrs.black} />
                    </Col>
                    <Col size={4}>
                      <Text style={styles.chartLegendText}>12000</Text>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
            </Col>
          </Grid>

          <Button
            raised
            icon={{name: 'angle-double-right', type: 'font-awesome'}}
            iconRight={true}
            buttonStyle={{margin:10}}
            onPress={this.showCashFlow}
            backgroundColor={clrs.linkButtonColor}
            title='See cash flow (April 2017)' />

          <Divider style={{ backgroundColor: 'blue' }} />

          <Grid style={styles.verticalWidgetContainer}>
            <Col style={styles.horizontalWidget}>
              <Text style={{color:clrs.textPrimaryColor, fontSize:20, marginTop:10}}>Total Cash</Text>
              <View style={styles.horizontalAlign}>
                <Icon
                  name='rupee'
                  type='font-awesome'
                  color={clrs.textGreenColor} />
                <Text style={{color:clrs.textGreenColor, fontSize:30, marginLeft:5, marginTop:12}}>{totalCash}</Text>
              </View>
            </Col> 
            <Col style={styles.horizontalRightWidget}>
              {renderBankAccounts}
            </Col>
          </Grid>

          <Grid style={styles.verticalWidgetContainerNoHeight}>
            <Col>
              <Text style={{fontSize:14, fontWeight:'bold', color:clrs.secondaryText, marginBottom:5}}>CASH IN WALLET</Text>          
              <Grid>
                <Col size={1}>
                  <Icon
                    name='rupee'
                    type='font-awesome'
                    size={20}
                    color={clrs.textPrimaryColor} />
                </Col>
                <Col size={6}>
                  <Text style={{fontSize:20, color:clrs.textPrimaryColor, marginTop:-5}}>{cashInWallet}</Text>
                </Col>
              </Grid>
            </Col>
            <Col>
              <Text style={{fontSize:14, fontWeight:'bold', color:clrs.secondaryText}}>LAST WITHDRAWAL</Text>          
              <Grid>
                <Col size={1}>
                  <Icon
                    name='rupee'
                    type='font-awesome'
                    size={20}
                    color={clrs.textPrimaryColor} />
                </Col>
                <Col size={6}>
                  <Text style={{fontSize:20, color:clrs.textPrimaryColor, marginTop:-5}}>{lastWithdrawal}</Text>
                </Col>
              </Grid>
            </Col>
          </Grid>

          <Grid style={styles.verticalWidgetContainer}>
            <Col style={styles.horizontalWidget}>
              <Text style={{color:clrs.textPrimaryColor, fontSize:20, marginTop:10}}>Upcoming expenses</Text>
              <View style={styles.horizontalAlign}>
                <Icon
                  name='rupee'
                  type='font-awesome'
                  color={clrs.textGreenColor} />
                <Text style={{color:clrs.textGreenColor, fontSize:30, marginLeft:5, marginTop:12}}>{upComingExpenses}</Text>
              </View>
            </Col> 
            <Col size={5}>
              <Grid>
                <Col size={5}><Text style={{fontSize:30, marginLeft:10, marginTop:25, color:'#fff'}}>{totalExpenses}</Text></Col>
                <Col size={6}>
                  <Text style={{fontSize:18, marginTop:30, color:'#fff'}}>Expenses</Text>
                  <Text style={{fontSize:18, color:clrs.linkButtonColor}}>View All</Text>
                </Col>
              </Grid>
            </Col>
          </Grid>

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
    fontSize:17,
    color: clrs.textPrimaryColor
  },
  verticalWidgetContainer:{
    backgroundColor: clrs.widgetBackgroundColor,
    padding:10,
    margin:10,
    marginBottom:0,
    height:140,
    flexDirection:'row'
  },
  verticalWidgetContainerNoHeight:{
    backgroundColor: clrs.widgetBackgroundColor,
    padding:10,
    margin:10,
    marginBottom:0,
    flexDirection:'row',
    height:70
  },
  horizontalWidget:{
    borderRightColor:'#fff',
    borderRightWidth:1,
    borderStyle:'dotted',
    padding:10,
    paddingRight:20
  },
  horizontalRightWidget:{
    padding:10,
    paddingLeft:15
  },
  horizontalAlign:{
    flex:1,
    flexDirection:'row',
  },
  chartLegentSquare:{
    backgroundColor:'#2980B9', 
    width:10, 
    height:10, 
    marginLeft:15
  },
  chartLegendTitle:{
    color:clrs.chartLegendTitle,
    fontSize:15,
    fontWeight:'bold',
    marginTop:-5
  },
  chartLegendText:{
    color:clrs.black,
    fontSize:16
  }

});