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
import Spinner from 'react-native-loading-spinner-overlay';

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
      'accountsInfo' : {},
      visible: false
    }
  }

  componentDidMount(){
    this.setState({visible:true});
    fetch('https://bluebank.azure-api.net/api/v0.7/customers/', this.attributesXhr)
    .then((response) => response.json())
			.then((responseJson) => {
        this.setState({'customerInfo': responseJson.results[0]});

        fetch('https://bluebank.azure-api.net/api/v0.7/customers/'+responseJson.results[0].id+'/accounts', this.attributesXhr)
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({'accountsInfo': responseJson.results, visible: false});
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
        <Spinner visible={this.state.visible} textContent={"Fetching data ..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: clrs.pageBackgroundColor,
    flex:1,
	},
})