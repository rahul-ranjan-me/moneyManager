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
} from 'react-native-elements';
import {AzureInstance, AzureLoginView} from 'react-native-azure-ad-2'

const CREDENTIAILS = {
    "client_id": "0f7ef810-2f9c-424c-942a-48c6ea361d9a",
    "client_secret": "",
    "authorize_uri": "https://login.microsoftonline.com/bluebankb2c.onmicrosoft.com/oauth2/v2.0/authorize",
    "token_uri": "https://login.microsoftonline.com/bluebankb2c.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_BlueBankSUSI",
    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob"],
    "scope": "User.ReadBasic.All Mail.Read",
    "keychain": true,
};

export default class Login extends Component {
  constructor(props){
    super(props);
    this.azureInstance = new AzureInstance(CREDENTIAILS);
	this._onLoginSuccess = this._onLoginSuccess.bind(this);
  }

  _onLoginSuccess(){
    this.azureInstance.getUserInfo().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

_onError(err){
    console.log(err)
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.headerText}>Money Manager</Text>
        </View>
        
        <AzureLoginView
            azureInstance={this.azureInstance}
            loadingMessage="Requesting access token"
            onSuccess={this._onLoginSuccess}
            onError={this._onError.bind(this)}
        />
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