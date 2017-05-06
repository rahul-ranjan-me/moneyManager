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
		this.state.jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE0OTQwOTI0MzYsIm5iZiI6MTQ5NDA4ODgzNiwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsImF1ZCI6IjBmN2VmODEwLTJmOWMtNDI0Yy05NDJhLTQ4YzZlYTM2MWQ5YSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlICIsImlhdCI6MTQ5NDA4ODgzNiwiYXV0aF90aW1lIjoxNDk0MDg4ODM2LCJvaWQiOiI0OGJkMzM1ZC01NjkxLTQwNDYtODQzOC0yYjkxY2NmNjVlZDUiLCJuYW1lIjoiUmFodWwiLCJmYW1pbHlfbmFtZSI6IlJhbmphbiIsImdpdmVuX25hbWUiOiJSYWh1bCBSYW5qYW4iLCJlbWFpbHMiOlsicmFodWwucmFuamFuQHJicy5jb20iXSwidGZwIjoiQjJDXzFfQmx1ZUJhbmtTVVNJIn0.H_RNzFm9jBlWlS4ovyx2uuB_0rQJHCBqXi0CM3lgpP_SE26Kw8pDyRauklunVUgW6w08jldfFrTXGz-DEq75UVPCiG9Gd26Ed178tE8gb4Oh3oNXie04BkOIT4HkZrAu5eD-TCK7wDmo9NohVt4Y2-kvaPZsNpsTVcHh9HpUFDkloIrAKTz9Tnr3tibpCBY7wH2lbe5-TwTR2EejxxWj68GfMmGthVLJCFL9tztK-vW6rCR8drOLCbYrOgCfp2UK8wamA4fVIXiUWuyBFVEE1yS530fEr8tdWmLdIDvyH0aXdwj4-zk4MJFEXePQ9o5jBH_O5_SdgnrT7ydqF9xrOA';
		this.state.subscriptionKey = '945965cd002045d497995b94115e65f1';

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
				this.props.navigator.replace({ id: 'aggregatedCashFlow' });
			})
			.catch((error) => {
				alert('Error occured, please check subscription key or jwt token');
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