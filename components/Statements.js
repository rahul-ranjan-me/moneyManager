import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Modal,
    TouchableHighlight,
    Picker,
    TextInput,
} from 'react-native';
import { 
    FormLabel,
    FormInput,
    Button,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import clrs from '../utils/Clrs';
import PageFooter from '../reusable-components/PageFooter';
import { hardwareBackPress } from 'react-native-back-android';
let isAggregated = null

class Statements extends Component{
    constructor(props){
        super(props);
        isAggregated = this.props.allTransactions.cashFlow ? false : true;
        this.state = { modalVisible : false, rules:[], customCategory: false,}
    }

    componentDidMount(){
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
				this.setState({'rules':rules})
			})
			.catch((error) => {
				alert('Error occured, please check subscription key or jwt token');
				console.error(error)
			})
    }

    createStatement(tran, i){
        return <TouchableHighlight key={i} onPress={() => {
          this.setCategory(true, tran)
        }}>
            <View style={styles.statementContainer}>
                <Text style={styles.amountText} >£ {String(Math.abs(tran.transactionAmount))} {tran.transactionAmount < 0 ? 'Dr.':'Cr.'}</Text>
                <View style={styles.para}>
                    <Text style={styles.heading}>Type: </Text>
                    <Text style={styles.text}>{tran.transactionType}</Text>
                </View>
                <View style={styles.para}>
                    <Text style={styles.heading}>Description: </Text>
                    <Text style={styles.text}>{tran.transactionDescription}</Text>
                </View>
                
                <View style={styles.para}>
                    <Text style={styles.heading}>Date: </Text>
                    <Text style={styles.text}>{new Date(tran.transactionDateTime).toString()}</Text>
                </View>
            </View>
        </TouchableHighlight>
    }

    setCategory(visible, tran) {
        this.setState({
            modalVisible: visible,
            chosenTransaction: tran
        });
    }

    showCustomCategory(){
        this.setState({
            customCategory : !this.state.customCategory,
            chosenCategory : null
        })
    }

    setCategoryType(category){
        this.setState({chosenCategory: category})
    }

    addRule(){
        const tran = this.state.chosenTransaction;
        let newRule = {
            data : [],
            result : this.state.chosenCategory
        };
        newRule.data.push(tran.transactionType, tran.transactionDescription, tran.transactionAmount)
        fetch('https://frozen-cliffs-20193.herokuapp.com/addrules', {
			method: 'POST',
			body:JSON.stringify({
                rule : newRule
            }),
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
		}).then((response) => response.json())
			.then((responseJson) => {
                this.setCategory(!this.state.modalVisible)
                isAggregated ? this.props.navigator.replace({id: 'aggregatedCashFlow'}) : this.props.navigator.replace({id: 'cashFlow'});
			})
			.catch((error) => {
				alert('Error occured, please check subscription key or jwt token');
				console.error(error)
			})
    }

    render(){
        const {key, label, transactions} = this.props.allTransactions;

        return (
            <View style={{flex:1}}>
                <LinearGradient 
                    start={{x: 0.0, y: 0.25}} end={{x: 0.7, y: 1.0}}
                    locations={[0,.7,0.9]}
                    colors={clrs.pageArrayBackgroundColor} style={styles.page}>

                    <Text style={styles.pageLabel}>{label ? label : 'Others'}</Text>
                    <Text style={styles.pageSubLabel}>(Statement)</Text>
                    <ScrollView style={{marginTop:15}}>
                        {transactions.map(this.createStatement.bind(this))}
                    </ScrollView>
                    <PageFooter />
                </LinearGradient>
                
                {this.state.chosenTransaction ? <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setCategory(!this.state.modalVisible)}}
                    >
                    <View style={styles.modalContainer}>
                        
                        <Text style={styles.pageLabel}>You are about to create rule for following transaction</Text>
                        <View style={{padding:10, marginTop:20, marginBottom:20, backgroundColor:'#000', borderTopColor:'rgba(255,255,255,.4)', borderTopWidth:1, borderBottomWidth:1, borderBottomColor:'rgba(255,255,255,.4)'}}>
                            <View style={styles.paraModal}>
                                <Text style={styles.heading}>Type:</Text>
                                <Text style={styles.text}>{this.state.chosenTransaction.transactionType}</Text>
                            </View>
                            <View style={styles.paraModal}>
                                <Text style={styles.heading}>Amount:</Text>
                                <Text style={styles.text}>£ {this.state.chosenTransaction.transactionAmount}</Text>
                            </View>
                            <View style={styles.paraModal}>
                                <Text style={styles.heading}>Description:</Text>
                                <Text style={styles.text}>{this.state.chosenTransaction.transactionDescription}</Text>
                            </View>
                        </View>

                         { this.state.customCategory ? <View style={styles.pickerContainer}>
                            <TextInput 
                                placeholder="Type custom category"
                                placeholderTextColor={clrs.secondaryWhiteText}
                                underlineColorAndroid={clrs.secondaryWhiteText}
                                onChangeText={this.setCategoryType.bind(this)} 
                                style={styles.input} />
                                <TouchableHighlight style={{padding:10, marginTop:-20}} onPress={this.showCustomCategory.bind(this)}><Text style={styles.text}>Pick from system defined category</Text></TouchableHighlight>
                            </View> : 
                            <View style={styles.pickerContainer}>
                                <Picker
                                selectedValue={this.state.chosenCategory}
                                onValueChange={this.setCategoryType.bind(this)}
                                style={styles.pickerStyle}>
                                {this.state.rules.map((item, i) => (
                                    <Picker.Item label={item} key={i} style={styles.pickerItem} value={item} />
                                ))}
                                </Picker>
                                <TouchableHighlight style={{padding:10}} onPress={this.showCustomCategory.bind(this)}><Text style={styles.text}>Want to create own category?</Text></TouchableHighlight>
                            </View>}
                        
                        <View style={{ flexDirection:'row', marginLeft:-15}}>
                             <Button
                                iconRight
                                icon={{name:'close'}}
                                onPress={() => {
                                    this.setCategory(!this.state.modalVisible)
                                }}
                                backgroundColor={clrs.secondaryOverlayButton}
                                underlayColor="#558B2F"
                                color={clrs.primaryWhiteText}
                                fontSize={20}
                                title='Cancel' />

                            <Button
                                iconRight
                                icon={{name:'plus', type:'font-awesome'}}
                                onPress={this.addRule.bind(this)}
                                backgroundColor={clrs.primaryOverlayButton}
                                underlayColor="#558B2F"
                                color={clrs.primaryWhiteText}
                                fontSize={20}
                                title='Add Category' />
                            
                        </View>

                        
                    </View>
                </Modal>
                : undefined }
            </View>
        )
        
    }
}

const handleBackButtonPress = ({ navigator }) => {
  isAggregated ? navigator.replace({id: 'aggregatedCashFlow'}) : navigator.replace({id: 'cashFlow'});
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
        textShadowOffset:{width:1, height:1}
    },
    pageSubLabel:{
        color:clrs.secondaryWhiteText,
        fontSize:14,
        alignSelf:'center',
    },
    statementContainer:{
        backgroundColor:clrs.blackBackgroundWithOpacity,
        borderBottomColor:'rgba(255,255,255,.2)', 
        borderBottomWidth:1, padding:10,
    },
    para:{
        flex:1,
        flexDirection:'row',
        padding:3,
    },
    heading:{
        fontWeight:'bold',
        fontSize:16,
        color:clrs.secondaryWhiteText,
        marginRight:5,
    },
    text:{
        fontSize:15,
        color:clrs.primaryWhiteText,
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
    paraModal:{
        flexDirection:'row'
    },
    pickerItem:{
        color: clrs.primaryWhiteText,
        fontSize: 12
    },
    pickerContainer:{
        backgroundColor:clrs.blackBackgroundWithOpacity,
        marginBottom:20
    },
    pickerStyle:{
        color: clrs.primaryWhiteText,
        backgroundColor:clrs.blackBackgroundWithOpacity
    },
    input:{
        color:'rgba(255,255,255,.7)',
        fontSize:15,
        width:'100%',
        padding:10,
        marginBottom:20
    },
    btnSetCategory:{

    }
})