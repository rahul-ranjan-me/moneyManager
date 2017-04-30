import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import clrs from '../utils/Clrs';
import { 
	Icon, 
	SocialIcon,
	ButtonGroup,
  Button,
} from 'react-native-elements';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  signIn(){
    this.props.navigator.replace({ id: 'home' });
    // GoogleSignin.signIn()
    //   .then((user) => {
    //     this.setState({user: user});
    //     this.props.navigator.replace({ id: 'home' });
    //   })
    //   .catch((err) => {
    //     console.log('WRONG SIGNIN', err);
    //   })
    //   .done();
  }

  componentDidMount(){
    
      GoogleSignin.configure({autoResolve: true})
      .then(() => {
        
      });
    
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.headerText}>Money Manager</Text>
        </View>
        
        <View style={styles.pageContent}>
          <SocialIcon
            title='Sign In With Google'
            button
            type='google-plus-official'
            onPress={this.signIn.bind(this)}
            style={{flex:1}}
          />
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