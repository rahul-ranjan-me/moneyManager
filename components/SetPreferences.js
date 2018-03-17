import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    AsyncStorage
} from 'react-native';
import { 
    FormLabel,
    FormInput,
    Button,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import clrs from '../utils/Clrs';
import Spinner from 'react-native-loading-spinner-overlay';
import PageFooter from '../reusable-components/PageFooter';
import { hardwareBackPress } from 'react-native-back-android';
let isAggregated = null

class Statements extends Component{
    constructor(props){
        super(props);
        this.setPreferenceObject = this.setPreferenceObject.bind(this);
        this.createPreferenceCategory = this.createPreferenceCategory.bind(this);
        this.state = {
            rules: []
        }
        this.myPreferences = {}
    }

    componentDidMount(){
        this.getPreferences();
        this.setState({'visible':true});
        fetch('https://frozen-cliffs-20193.herokuapp.com/rules', {
			method: 'GET',
			body:null
		}).then((response) => response.json())
			.then((responseJson) => {
                var rules = [];
                responseJson.trainingData.result.map((rule) => {
                    if(rules.indexOf(rule) === -1){
                        rules.push(rule);
                    }
                });
				this.setState({'rules':rules, 'visible': false})
			})
			.catch((error) => {
				alert('Error occured, please check subscription key or jwt token');
				console.error(error)
			})
    }

    createPreferenceCategory(category, key){
        return <View style={styles.para} key={key}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.heading}>{category}</Text>
                    <Text style={{position:'absolute', right:5, top:5}}>{this.myPreferences[category] ? '£ '+this.myPreferences[category]: ''}</Text>
                </View>
                <View style={{marginLeft:-10}}>
                    <TextInput 
                        placeholder=""
                        placeholderTextColor={clrs.secondaryWhiteText}
                        underlineColorAndroid={clrs.secondaryWhiteText}
                        onChangeText={(val) => {this.setPreferenceObject(val, category)}} 
                        style={styles.input} />
                </View>
            </View>
    }

    setPreferenceObject(val, category){
        this.myPreferences[category] = val
    }

    getPreferences(){
        try {
            AsyncStorage.getItem('preferences').then((value) => {
                if (value !== null){
                    this.myPreferences = value ? JSON.parse(value) : {}
                }
            })
        } catch (error) {
            console.log('error', error)
            // Error retrieving data
        }        
    }

    addPreferences(){
        try {
            AsyncStorage.setItem('preferences', JSON.stringify(this.myPreferences))
            this.props.navigator.replace({id: 'home'});
            this.props.navigator.pop();
        } catch (error) {
            // Error retrieving data
        }
    }

    render(){
        return (
            <LinearGradient 
                start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
                locations={[0,.7,0.9]}
                colors={clrs.pageArrayBackgroundColor} style={styles.page}>
                <Text style={styles.pageLabel}>Set target per category</Text>
                <ScrollView style={{paddingBottom:50}}>
                    <LinearGradient 
                        start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
                        locations={[0,.7,0.9]}
                        colors={clrs.pageArrayBackgroundColor} style={styles.page}>
                        <View style={{padding:10}}>{this.state.rules.map(this.createPreferenceCategory.bind(this))}</View>
                    </LinearGradient>
                </ScrollView>
                <View style={{ flexDirection:'row', padding:20}}>
                        <Button
                        iconRight
                        icon={{name:'close'}}
                        onPress={() => {
                            this.props.navigator.replace({id: 'home'});
                            this.props.navigator.pop();
                        }}
                        backgroundColor={clrs.secondaryOverlayButton}
                        underlayColor="#558B2F"
                        color={clrs.primaryWhiteText}
                        fontSize={20}
                        title='Cancel' />

                    <Button
                        iconRight
                        icon={{name:'plus', type:'font-awesome'}}
                        onPress={this.addPreferences.bind(this)}
                        backgroundColor={clrs.primaryOverlayButton}
                        underlayColor="#558B2F"
                        color={clrs.primaryWhiteText}
                        fontSize={20}
                        title='Add Target' />
                    
                </View>
                <Spinner visible={this.state.visible} textContent={"Loading categories ..."} textStyle={{color: clrs.textPrimaryColor}} overlayColor={clrs.overlayColor} />
                <PageFooter />
            </LinearGradient>
        )
        
    }
}

const handleBackButtonPress = ({ navigator }) => {
  navigator.replace({id: 'home'});
  navigator.pop();
  return true;
};

const statement = hardwareBackPress(Statements, handleBackButtonPress);

export default statement;

const styles = StyleSheet.create({
	page: {
        flex:1,
        flexDirection:'column'
	},
    pageLabel:{
        color:clrs.primaryWhiteText,
        fontSize:16,
        alignSelf:'center',
        textShadowColor:'#000',
        marginTop:15,
        marginBottom:10,
        textShadowOffset:{width:1, height:1}
    },
    para:{
        flexDirection:'column',
        padding:2,
        paddingLeft:10,
        paddingTop:0,
        paddingBottom:0
    },
    heading:{
        fontWeight:'bold',
        fontSize:16,
        color:clrs.secondaryWhiteText,
        marginLeft:-10,
        padding:2,
    },
    amountText:{
        fontSize:17,
        position:'absolute',
        right:15,
        color:clrs.textGreenColor,
        marginTop:10,
    },
    modalContainer:{
        backgroundColor:clrs.modalBackground,
        padding:20,
        flex:1,
    },
    input:{
        color:'rgba(255,255,255,.7)',
        fontSize:15,
        width:'100%',
        padding:5,
        marginBottom:5,
    }
})