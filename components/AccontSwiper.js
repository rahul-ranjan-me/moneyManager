import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { 
	Button,
  Divider,
} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import clrs from '../utils/Clrs';

const {height, width} = Dimensions.get('window');

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {'accountsInfo': []}
  }

  componentWillReceiveProps(newProps, oldProps){
    if(newProps.accountsInfo && newProps.accountsInfo instanceof Array){
      this.setState({'accountsInfo': newProps.accountsInfo});
    }
  }

  setAccountId(id){
    this.props.setAccountId(id);
  }

  render(){
    return (
      <View style={{flex:1, backgroundColor:clrs.pageBackgroundColor}}>
          {this.state.accountsInfo.length > 0 ? <Swiper style={styles.wrapper}>
        
              {this.state.accountsInfo.map((item, i) => (
                <SlideItem item={item} key={i} navigator={this.props.navigator} setAccountId={this.setAccountId.bind(this)} />
              ))}
            </Swiper> : null}
      </View>
    )
  }
}

export class SlideItem extends Component{
    constructor(props){
        super(props);
    }

    showHome(){
      this.props.setAccountId(this.props.item.id)
      this.props.navigator.replace({ id: 'accounts' });
    }

    render(){
      const {id, sortCode, accountNumber, Iban, Bban, accountType, accountFriendlyName, accountBalance, accountCurrency} = this.props.item;
      
      return <View style={styles.slide}>
          <View style={styles.accountsDetails}>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Name: </Text>
              <Text style={styles.text}>{accountFriendlyName}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Id: </Text>
              <Text style={styles.text}>{id}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Sortcode: </Text>
              <Text style={styles.text}>{sortCode}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Number: </Text>
              <Text style={styles.text}>{accountNumber}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Type: </Text>
              <Text style={styles.text}>{accountType}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Balance: </Text>
              <Text style={styles.text}>{accountBalance}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.heading}>Account Currency: </Text>
              <Text style={styles.text}>{accountCurrency}</Text>
            </View>
            <Button
              raised
              icon={{name: 'angle-double-right', type: 'font-awesome'}}
              iconRight={true}
              buttonStyle={{margin:10}}
              onPress={this.showHome.bind(this)}
              backgroundColor={clrs.linkButtonColor}
              title='See account details' />
            <View>
              <Text style={{ marginTop:20, marginLeft:30}}>Please swipe right or left to see other accounts</Text>
            </View>
          </View>
          
      </View>
    }
}

const styles = StyleSheet.create({
  wrapper:{},
  slide: {
    flex:1,
    backgroundColor: clrs.textPrimaryColor,
    borderBottomColor:clrs.secondaryText,
    borderBottomWidth:1,
  },
  backgroundInnerlay: {
    width:width,
    height:null,
    opacity:0.7,
    backgroundColor:clrs.pageBackgroundColor
  },
  accountsDetails:{
    padding:10,
    backgroundColor:"rgba(255,255,255,.5)",
    width:width,
  },
  infoWrapper:{
    marginBottom:5,
    flexDirection:'row'
  },
  text: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  heading:{
    fontSize:17,
    fontWeight:'bold'
  }
})