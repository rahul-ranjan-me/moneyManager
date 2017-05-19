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
      balance += parseFloat(acc.accountBalance);
    });
    this.setState({balance: balance})
  }

  render(){
    return <View style={styles.container}>
        <Text style={styles.pageLabel}>COMBINED BALANCE</Text>
        <Text style={styles.combineBalance}>£ {String(this.state.balance)}</Text>
        <Text style={{position:'absolute', right:15, bottom:-15, color:clrs.secondaryWhiteText, fontSize:15}}>Balance</Text>
    </View>
  }
}

const styles = StyleSheet.create({
	container:{
    marginTop:1,
    marginTop:15,
    marginBottom:25,
  },
  pageLabel:{
    color:clrs.primaryWhiteText,
    fontSize:16,
    alignSelf:'center',
  },
  combineBalance:{
    color:clrs.textPrimaryColor,
    fontSize:50,
    alignSelf:'center',
    textShadowColor:'#000',
		textShadowOffset:{width:1, height:1}
  }
})
