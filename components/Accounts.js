import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
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
import clrs from '../utils/Clrs';
import customerData from '../utils/customerData';
import AccontSwiper from './AccontSwiper';
import WelcomeBar from '../reusable-components/WelcomeBar';
import CombinedAccountBalance from '../reusable-components/CombinedAccountBalance';

export default class Accounts extends Component{
  constructor(props){
    super(props)
    this.attributesXhr = {
			method: 'GET',
			headers : this.props.headers,
			body:null
		};
    this.state = {
      'customerInfo' : {},
      'accountsInfo' : {}
    }
  }

  componentDidMount(){

    // Temp
    // const headers = {
		// 	'Authorization' : 'bearer eyJleHAiOjE0OTM5MTc2MDgsIm5iZiI6MTQ5MzkxNDAwOCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsImF1ZCI6IjBmN2VmODEwLTJmOWMtNDI0Yy05NDJhLTQ4YzZlYTM2MWQ5YSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlICIsImlhdCI6MTQ5MzkxNDAwOCwiYXV0aF90aW1lIjoxNDkzOTE0MDA4LCJvaWQiOiI0OGJkMzM1ZC01NjkxLTQwNDYtODQzOC0yYjkxY2NmNjVlZDUiLCJuYW1lIjoiUmFodWwiLCJmYW1pbHlfbmFtZSI6IlJhbmphbiIsImdpdmVuX25hbWUiOiJSYWh1bCBSYW5qYW4iLCJlbWFpbHMiOlsicmFodWwucmFuamFuQHJicy5jb20iXSwidGZwIjoiQjJDXzFfQmx1ZUJhbmtTVVNJIn0.b6qSX-LQ6ktrwspmLRAcDH2L27mUaMujX30eaapemSh6eGgc8Gmx8g_boPjW8s00kMkwn8_6T-v6f-3I9ezvzt8iL3RSBY9yiScPTWxCqNSNxOZceFHIMRH8kKyxKoDo94fiyRGbrmiyeJ1JEt8oFCRaAY4NP-uRF9w5WiSsOrXfygAO7b-dxbLr-7dll3WZBw1xCPO9mqXHbvzQeNKYMgCfRC05Ht0cHaZ-dRTf5ZS1bGJxowtKzDWfs8fJjRuFmKrbwAUUnE3XA5ASG-Df4YcPvaZExoQCLRBcqc2lPcqRczmx2d3-LjutBBvCM7Rih_lNywe_1hF1TTRBGeDu3g',
		// 	'Ocp-Apim-Subscription-key' : '945965cd002045d497995b94115e65f1'
		// }
    // this.attributesXhr.headers = headers;
    //Temp

    fetch('https://bluebank.azure-api.net/api/v0.7/customers/', this.attributesXhr)
    .then((response) => response.json())
			.then((responseJson) => {
        this.setState({'customerInfo': responseJson.results[0]});

        fetch('https://bluebank.azure-api.net/api/v0.7/customers/'+responseJson.results[0].id+'/accounts', this.attributesXhr)
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({'accountsInfo': responseJson.results});
          })
          .catch((error) => {
            alert(error);
          })
      })
      .catch((error) => {
        alert(error);
      })
  }

  setAccountId(id){
    this.props.setAccountId(id);
  }

  render(){
    return(
      <View style={styles.page}>
        <WelcomeBar customerInfo={this.state.customerInfo} />
        <CombinedAccountBalance accountsInfo={this.state.accountsInfo} />
        <Divider style={{ backgroundColor: 'blue', marginTop:10 }} />
        <Divider style={{ backgroundColor: 'blue' }} />
        <AccontSwiper accountsInfo={this.state.accountsInfo} navigator={this.props.navigator} setAccountId={this.setAccountId.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: clrs.pageBackgroundColor
	},
})