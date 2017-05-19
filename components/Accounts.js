import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import clrs from '../utils/Clrs';
import AccontSwiper from './AccontSwiper';
import WelcomeBar from '../reusable-components/WelcomeBar';
import CombinedAccountBalance from '../reusable-components/CombinedAccountBalance';
import Spinner from 'react-native-loading-spinner-overlay';
import { hardwareBackPress } from 'react-native-back-android';
import PageFooter from '../reusable-components/PageFooter';

class Accounts extends Component{
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
            this.setState({'visible':false});
            alert('Some error occured fetching data');
            alert(error);
          })
      })
      .catch((error) => {
        this.setState({'visible':false});
        alert('Some error occured fetching data');
        alert(error);
      })
  }

  setAccountId(id){
    this.props.setAccountId(id);
  }

  render(){
    return(
      <LinearGradient 
        start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
        locations={[0,.7,0.9]}
        colors={clrs.pageArrayBackgroundColor} style={styles.page}>
        {/*<WelcomeBar customerInfo={this.state.customerInfo} />*/}
        <CombinedAccountBalance accountsInfo={this.state.accountsInfo} />
        <AccontSwiper accountsInfo={this.state.accountsInfo} navigator={this.props.navigator} setAccountId={this.setAccountId.bind(this)} />
        <PageFooter />
        <Spinner visible={this.state.visible} textContent={"Fetching data ..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
     </LinearGradient>
    )
  }
}

const handleBackButtonPress = ({ navigator }) => {
  navigator.pop();
  return true;
};
const accounts = hardwareBackPress(Accounts, handleBackButtonPress);

export default accounts;

const styles = StyleSheet.create({
	page: {
		flex:1,
	},
})