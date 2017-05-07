import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import clrs from '../utils/Clrs';

export default class PageFooter extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return <View style={styles.pageFooter}>
            <Text style={styles.footerText}>All rights reserved</Text>
        </View>
  }
}

const styles = StyleSheet.create({
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
})
