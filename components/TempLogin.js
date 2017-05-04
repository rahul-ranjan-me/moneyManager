import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import clrs from '../utils/Clrs';
import { 
	Icon, 
	SocialIcon,
	ButtonGroup,
	Button,
	FormInput,
	FormLabel
} from 'react-native-elements';

export default class TempLogin extends Component {
  constructor(props){
    super(props);
		this.state = {'jwtToken': null, 'subscriptionKey': null};
  }

	setJwtToken(token){
		this.setState({'jwtToken': token});
	}

	setSubscriptionKey(key){
		this.setState({'subscriptionKey': key});
	}

	updateStorage(){
		// this.state.jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE0OTM5MTc2MDgsIm5iZiI6MTQ5MzkxNDAwOCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsImF1ZCI6IjBmN2VmODEwLTJmOWMtNDI0Yy05NDJhLTQ4YzZlYTM2MWQ5YSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlICIsImlhdCI6MTQ5MzkxNDAwOCwiYXV0aF90aW1lIjoxNDkzOTE0MDA4LCJvaWQiOiI0OGJkMzM1ZC01NjkxLTQwNDYtODQzOC0yYjkxY2NmNjVlZDUiLCJuYW1lIjoiUmFodWwiLCJmYW1pbHlfbmFtZSI6IlJhbmphbiIsImdpdmVuX25hbWUiOiJSYWh1bCBSYW5qYW4iLCJlbWFpbHMiOlsicmFodWwucmFuamFuQHJicy5jb20iXSwidGZwIjoiQjJDXzFfQmx1ZUJhbmtTVVNJIn0.b6qSX-LQ6ktrwspmLRAcDH2L27mUaMujX30eaapemSh6eGgc8Gmx8g_boPjW8s00kMkwn8_6T-v6f-3I9ezvzt8iL3RSBY9yiScPTWxCqNSNxOZceFHIMRH8kKyxKoDo94fiyRGbrmiyeJ1JEt8oFCRaAY4NP-uRF9w5WiSsOrXfygAO7b-dxbLr-7dll3WZBw1xCPO9mqXHbvzQeNKYMgCfRC05Ht0cHaZ-dRTf5ZS1bGJxowtKzDWfs8fJjRuFmKrbwAUUnE3XA5ASG-Df4YcPvaZExoQCLRBcqc2lPcqRczmx2d3-LjutBBvCM7Rih_lNywe_1hF1TTRBGeDu3g';
		// this.state.subscriptionKey = '945965cd002045d497995b94115e65f1';

		const headers = {
			'Authorization' : 'bearer '+this.state.jwtToken,
			'Ocp-Apim-Subscription-key' : this.state.subscriptionKey
		}

		fetch('https://bluebank.azure-api.net/api/v0.7/customers', {
			method: 'GET',
			headers : headers,
			body:null
		}).then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson)
				this.props.setHeadersAndInfo(headers, responseJson.results[0]);
				this.props.navigator.replace({ id: 'home' });
			})
			.catch((error) => {
				console.error(error)
			})
	}


  render() {
    return (
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.headerText}>Money Manager</Text>
        </View>
        
				<View>
					<FormLabel>Subscription key</FormLabel>
					<FormInput onChangeText={this.setSubscriptionKey.bind(this)} />
					
					<FormLabel>JWT token</FormLabel>
					<FormInput onChangeText={this.setJwtToken.bind(this)} />

					<Button
						large
						iconRight
						icon={{name:'code'}}
						onPress={this.updateStorage.bind(this)}
						title='Login' />
				</View>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: clrs.textPrimaryColor
	},
  pageHeader:{
    backgroundColor:clrs.darkPrimaryColor,
    padding:10,
  },
  headerText:{
    fontSize:20,
    color: clrs.textPrimaryColor,
    fontWeight:'bold'
  },
	pageContent: {
		flex: 1,
    flexDirection:'row',
		alignItems: 'center',
	}
});