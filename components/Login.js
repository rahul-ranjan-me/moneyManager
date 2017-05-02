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
    client_id: '0f7ef810-2f9c-424c-942a-48c6ea361d9a',
    scope: 'User.ReadBasic.All Mail.Read'
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