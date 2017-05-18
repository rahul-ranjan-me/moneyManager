import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { 
	Button,
  Divider,
  Icon,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
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
      <ScrollView style={{flex:1}}>
        <LinearGradient colors={clrs.scrollArrayBackgroundColor} style={styles.page}>
          {this.state.accountsInfo.length > 0 ? <View>
             
              {this.state.accountsInfo.map((item, i) => (
                <SlideItem style={styles.slide} item={item} navigator={this.props.navigator} setAccountId={this.setAccountId.bind(this)} key={i} />
              ))}
            </View> : null}
        </LinearGradient>
      </ScrollView>
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
      
      return <TouchableOpacity onPress={this.showHome.bind(this)} style={styles.accountContainer}>
        <View>
          <Icon
            name='cube'
            type='font-awesome'
            size={20}
            color={clrs.primaryWhiteText}
            style={{position:'absolute', left:0, top:3}}
            />
          <Text style={styles.accountTitle}>{accountFriendlyName}</Text>
        </View>
        <Text style={styles.accountBalance}>£ {accountBalance}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.heading}>Sortcode: </Text>
          <Text style={styles.text}>{sortCode}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.heading}>Number: </Text>
          <Text style={styles.text}>{accountNumber}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.heading}>Type: </Text>
          <Text style={styles.text}>{accountType}</Text>
        </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
  wrapper:{},
  accountContainer:{
    padding:15,
    width:width,
    borderTopColor:clrs.secondaryWhiteText,
    borderTopWidth:1
  },
  infoWrapper:{
    marginTop:5,
    flexDirection:'row'
  },
  accountTitle:{
    color:clrs.primaryWhiteText,
    fontSize:20,
    marginBottom:5,
    marginLeft:30,
  },
  accountBalance:{
    fontSize:34,
    position:'absolute',
    right:15,
    color:clrs.textGreenColor,
    marginTop:15,
  },
  text: {
    color: clrs.primaryWhiteText,
    fontSize: 15,
    fontWeight: 'bold',
  },
  heading:{
    fontSize:17,
    fontWeight:'bold',
    color:clrs.secondaryWhiteText,
    width:90,
  }
})
