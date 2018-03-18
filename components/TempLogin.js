import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
    TextInput,
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
import LinearGradient from 'react-native-linear-gradient';
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
		this.state.jwtToken = this.state.jwtToken ? this.state.jwtToken : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE1MjEzNDg1NTcsIm5iZiI6MTUyMTM0NDk1NywidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsImF1ZCI6IjQwOTU3YjljLTYzYmMtNGFiNC05ZWNiLTY3YjU0M2M4ZTRjYSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNTIxMzQ0OTU3LCJhdXRoX3RpbWUiOjE1MjEzNDQ5NTcsIm9pZCI6IjQ4YmQzMzVkLTU2OTEtNDA0Ni04NDM4LTJiOTFjY2Y2NWVkNSIsIm5hbWUiOiJSYWh1bCIsImZhbWlseV9uYW1lIjoiUmFuamFuIiwiZ2l2ZW5fbmFtZSI6IlJhaHVsIFJhbmphbiIsImVtYWlscyI6WyJyYWh1bC5yYW5qYW5AcmJzLmNvbSJdLCJ0ZnAiOiJCMkNfMV9CbHVlQmFua1NVU0kifQ.MfVd46mL0dee3iiM6XEdVNtnY5Fzi3EzULQkwc_-j7etjbbV-_3bvsKoIFtxypWXSyngt9WT6s6-zv5eUMbLSi4kWokQQ-sTDye9YAl_GqvW_yN-gLGCkP43r3ITvYa2ZKGneitSY2wwI-lEbPs74AlW4OLZHp9PaVCHQp1mrEVyycfFPLCucSyWMaNYmg6F-0zq4s6KBSzJtSv7orqDoTmVusGxYI-krylSh4Xqj0IufwIKwjolm5hZ2nJZCaotfq0iuf7DfTRnuAH_7yjkH4rnNQRTTxfw1pE68wM-u8DFVcHHgpq9VCLzCnT7yfv5G2KWyNVVcM-PhWE8x8M3zA';
		this.state.subscriptionKey = this.state.subscriptionKey ? this.state.subscriptionKey : 'aa4675945448463d85c52251104fbb56';

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
        <LinearGradient 
            start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
            locations={[0,.7,0.9]}
            colors={clrs.pageArrayBackgroundColor} style={styles.page}>
            <View style={styles.loginContainer}>
                <Icon
                    name='mercury'
                    type='font-awesome'
                    size={60}
                    color={clrs.primaryWhiteText}
                    />

                <Text style={styles.headerText}>Money Manager</Text>
                
                <View style={styles.formContainer}>
                    <TextInput 
                        placeholder="Subscription key"
                        placeholderTextColor='rgba(255,255,255,.5)'
                        underlineColorAndroid='rgba(255,255,255,.5)'
                        onChangeText={this.setSubscriptionKey.bind(this)} 
                        style={styles.input} />
                    
                    <TextInput 
                        placeholder="JWT token"
                        placeholderTextColor={clrs.secondaryWhiteText}
                        underlineColorAndroid={clrs.secondaryWhiteText}
                        onChangeText={this.setJwtToken.bind(this)} 
                        style={styles.input} />

                    <Button
                        iconRight
                        icon={{name:'code'}}
                        onPress={this.updateStorage.bind(this)}
                        backgroundColor={clrs.primaryButtonBackground}
                        underlayColor="#558B2F"
                        color={clrs.primaryWhiteText}
                        fontSize={20}
                        title='Login' />
                </View>
            </View>
            <Spinner visible={this.state.visible} textContent={"loggin in..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={'rgba(0,0,0,.7)'} />
            
        </LinearGradient>
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
    page:{
        flex: 1,
    },
    logo:{
        height:100,
        width:100,
        borderRadius:150,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    loginContainer:{
        position:'absolute',
        top:'12%',
        width:'100%',
        padding:10,
    },
    input:{
        color:'rgba(255,255,255,.7)',
        fontSize:15,
        width:'100%',
        padding:10,
        marginBottom:20
    },
    headerText:{
        fontSize:20,
        color:'rgba(255,255,255,.7)',
        fontWeight:'bold',
        marginTop:10,
        alignSelf:'center',
        textShadowColor:'#000',
		textShadowOffset:{width:1, height:1}
    },
    formContainer:{
        width:'85%',
        alignSelf:'center', 
        marginTop:30
    }
});