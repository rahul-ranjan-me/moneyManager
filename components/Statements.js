import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
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
import LinearGradient from 'react-native-linear-gradient';
import clrs from '../utils/Clrs';
import PageFooter from '../reusable-components/PageFooter';
import { hardwareBackPress } from 'react-native-back-android';
let isAggregated = null

class Statements extends Component{
    constructor(props){
        super(props);
        isAggregated = this.props.allTransactions.cashFlow ? false : true;
    }

    createStatement(tran, i){
        return <View key={i} style={styles.statementContainer}>
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
    }

    render(){
        const {key, label, transactions} = this.props.allTransactions;

        return <LinearGradient 
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
})