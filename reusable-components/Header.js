import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import clrs from '../utils/Clrs';

export default class Header extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {title} = this.props;

    return <View style={styles.pageHeader}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
  }
}

const styles = StyleSheet.create({
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
})
