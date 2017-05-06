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
import Spinner from 'react-native-loading-spinner-overlay';

export default class TempLogin extends Component {
  constructor(props){
    super(props);
		this.state = {'jwtToken': null, 'subscriptionKey': null, visible:false};
  }

	setJwtToken(token){
		this.setState({'jwtToken': token});
	}

	setSubscriptionKey(key){
		this.setState({'subscriptionKey': key});
	}

	updateStorage(){
		this.setState({'visible':true});
		this.state.jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE0OTQwOTQzODEsIm5iZiI6MTQ5NDA5MDc4MSwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsImF1ZCI6IjBmN2VmODEwLTJmOWMtNDI0Yy05NDJhLTQ4YzZlYTM2MWQ5YSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlICIsImlhdCI6MTQ5NDA5MDc4MSwiYXV0aF90aW1lIjoxNDk0MDkwNzgxLCJvaWQiOiI0OGJkMzM1ZC01NjkxLTQwNDYtODQzOC0yYjkxY2NmNjVlZDUiLCJuYW1lIjoiUmFodWwiLCJmYW1pbHlfbmFtZSI6IlJhbmphbiIsImdpdmVuX25hbWUiOiJSYWh1bCBSYW5qYW4iLCJlbWFpbHMiOlsicmFodWwucmFuamFuQHJicy5jb20iXSwidGZwIjoiQjJDXzFfQmx1ZUJhbmtTVVNJIn0.m-rUPNEF3r3x8yuFqN46_Y824KUJ6nFtVr6I2VlCxFhsoEvNo-Yb1ql_msb5jp_kBPrnCa7CN-PoR5jKJGFuGyvs28RZxnTNjBLBqlKLu1AgvmbJknCOEB6G9KxAqqJDzBZ3KnlBtNTq6xulEsoh7RRqs8PPeKfsQjOEad_ZbRKXBstyZVLl8kBCxpGeQjgOjX-5wjiBxymzsVgIuv4cpCVzTo97aVyRPtYkU6XGnGk_Tqx_M1eAKrTe0_BhDXRUomOlbVFIHJfjBa77ZqZLsacXrACRxtfDyVyzEyNYBhRdzcUwOisEPW8-nexNTbLUiSdq5wfs1xKn6L-rprYWOQ';
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
				this.props.setHeadersAndInfo(headers, responseJson.results[0]);
				this.props.navigator.replace({ id: 'home' });
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

				<Spinner visible={this.state.visible} textContent={"loggin in..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
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