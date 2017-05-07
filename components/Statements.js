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
import clrs from '../utils/Clrs';

export default class statement extends Component{
    constructor(props){
        super(props);
    }

    manageBack(){
        this.props.allTransactions.cashFlow ? this.props.navigator.replace({id: 'cashFlow'}) : this.props.navigator.replace({id: 'aggregatedCashFlow'});
    }

    createStatement(tran, i){
        return <View key={i} style={{backgroundColor:clrs.textPrimaryColor, margin:10, padding:20,}}>
            <View style={styles.para}>
                <Text style={styles.heading}>Id: </Text>
                <Text style={styles.text}>{tran.id}</Text>
            </View>
             <View style={styles.para}>
                <Text style={styles.heading}>Date: </Text>
                <Text style={styles.text}>{new Date(tran.transactionDateTime).toString()}</Text>
            </View>
            <View style={styles.para}>
                <Text style={styles.heading}>Type: </Text>
                <Text style={styles.text}>{tran.transactionType}</Text>
            </View>
            <View style={styles.para}>
                <Text style={styles.heading}>Description: </Text>
                <Text style={styles.text}>{tran.transactionDescription}</Text>
            </View>
            <View style={styles.para}>
                <Text style={styles.heading}>Amount: </Text>
                <Text style={styles.text} >£ {Math.abs(tran.transactionAmount)} {tran.transactionAmount < 0 ? 'Dr.':'Cr.'}</Text>
            </View>
        </View>
    }

    render(){
        const {key, label, transactions} = this.props.allTransactions;

        return <View style={styles.page}>
            <View style={styles.pageHeader}>
                <Text style={styles.headerText}>{label}</Text>
                <Text>(Statement)</Text>
                <View style={{position:'absolute', top:10, right:20}}>
                    <Icon
                    name='backward'
                    type='font-awesome'
                    size={50}
                    onPress={this.manageBack.bind(this)}
                    color={clrs.textPrimaryColor} />
                </View>
            </View>

            <ScrollView>
                {transactions.map(this.createStatement.bind(this))}
                <View style={styles.pageFooter}>
                    <Text style={styles.footerText}>All rights reserved</Text>
                </View>
            </ScrollView>
        </View>
        
    }
}

const styles = StyleSheet.create({
	page: {
        backgroundColor: clrs.pageBackgroundColor,
        flex:1,
	},
    pageHeader:{
        backgroundColor:clrs.primaryColor,
        padding:15,
        marginTop:1,
        alignItems:'center'
    },
    headerText:{
        fontSize:24,
        color: clrs.textPrimaryColor,
        fontWeight:'bold'
    },
    para:{
        flex:1,
        flexDirection:'column',
        padding:5,
    },
    heading:{
        fontWeight:'bold',
        fontSize:16,
        color:clrs.secondaryText
    },
    text:{
        fontSize:15,
        color:clrs.black,
    },
    pageFooter:{
        backgroundColor:clrs.darkPrimaryColor,
        padding:10,
        marginTop:15,
        alignItems:'center'
    },
    footerText:{
        fontSize:20,
        color: clrs.textPrimaryColor
    },
})