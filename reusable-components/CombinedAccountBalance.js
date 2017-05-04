import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import clrs from '../utils/Clrs';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.combinedBalance = this.combinedBalance.bind(this);
    this.state = {'accountsInfo': [], balance: 0}
  }

  componentWillReceiveProps(newProps, oldProps){
    if(newProps.accountsInfo && newProps.accountsInfo instanceof Array){
      this.setState({'accountsInfo': newProps.accountsInfo});
      this.combinedBalance(newProps.accountsInfo);
    }
  }

  combinedBalance(accInfo){
    var balance = 0;
    accInfo.map((acc) => {
      balance += parseInt(acc.accountBalance);
    });
    this.setState({balance: balance})
  }

  render(){
    return <View style={styles.container}>
        <View>
          <Text style={styles.textInfo}>You have {this.state.accountsInfo.length} accounts</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.combineBalanceLabel}>Your combined balance: </Text>
            <Text style={styles.combineBalance}>£ {this.state.balance}</Text>
        </View>
    </View>
  }
}

const styles = StyleSheet.create({
	container:{
    backgroundColor:clrs.widgetBackgroundColor,
    padding:15,
    marginTop:1,
  },
  textInfo:{
    color:clrs.textPrimaryColor,
    fontSize:13,
    marginBottom:10
  },
  combineBalanceLabel:{
    color:clrs.textPrimaryColor,
    fontSize:18,
  },
  combineBalance:{
    color:clrs.textGreenColor,
    fontSize:20,
    marginLeft:20
  }
})
