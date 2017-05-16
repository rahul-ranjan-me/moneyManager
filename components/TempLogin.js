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
import { hardwareBackPress } from 'react-native-back-android';

class TempLogin extends Component {
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
		this.state.jwtToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE0OTQ5NTExOTcsIm5iZiI6MTQ5NDk0NzU5NywidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsImF1ZCI6IjQwOTU3YjljLTYzYmMtNGFiNC05ZWNiLTY3YjU0M2M4ZTRjYSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNDk0OTQ3NTk3LCJhdXRoX3RpbWUiOjE0OTQ5NDc1OTcsIm9pZCI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsIm5hbWUiOiJSYWh1bCIsImZhbWlseV9uYW1lIjoiUmFuamFuIiwiZ2l2ZW5fbmFtZSI6IlJhaHVsIFJhbmphbiIsImVtYWlscyI6WyJyYWh1bC5yYW5qYW5AcmJzLmNvbSJdLCJ0ZnAiOiJCMkNfMV9CbHVlQmFua1NVU0kifQ.Wxj5qe_G4okyadb4RVsJJdoCVeRTkuTroUa49k5wYVN2ddf_k3cl7JnCIKoZIr30vdFC66ENsOnbcX0QSV9pxHQeKbEcJNlckgb5mSVhBofK-1_AelgIi0cTq1NtBWiBpqRZhejmdrr6P1s7FxKFVm2jgI7wAizJcjKDLTngkwGnlEFyJzJcrKdhvQ0_BAJf-YrBx4AcvO6Kz1ZZ3tIKQxHztzsfp52dYCAo0Rt3IkSUdFUNVaUDAp3-32dTVZrcsVvd4t6_9Y4nVUs4Mr-0gRYONw9gKHtMp99RTDKgtj9PkIh4HQk-Ib7T-Iuqb4IPhqKE9VyWUFSxtJ-zkWkCPg';
		this.state.subscriptionKey = 'aa4675945448463d85c52251104fbb56';

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
				this.setState({'visible':false});
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

const handleBackButtonPress = ({ navigator }) => {
  navigator.pop();
  return true;
};
const templogin = hardwareBackPress(TempLogin, handleBackButtonPress);

export default templogin;

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