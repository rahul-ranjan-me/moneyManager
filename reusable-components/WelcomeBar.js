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
    this.state = {'customerInfo': {}}
  }

  componentWillReceiveProps(newProps, oldProps){
    this.setState({'customerInfo': newProps.customerInfo});
  }

  render(){
    const {givenName, id, mobilePhone} = this.state.customerInfo;

    return <View style={styles.container}>
          <Text style={styles.textInfo}>Welcome : {givenName}</Text>
          <Text style={styles.textInfo}>AccountId : {id}</Text>
          <Text style={styles.textInfo}>Mobile Phone : {mobilePhone}</Text>
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
    fontSize:15,
    marginBottom:10
  }
})
