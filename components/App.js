import React, {Component} from 'react';
import {
  Navigator,
  View,
  Text,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import backAndroid from 'react-native-back-android';
import clrs from '../utils/Clrs';

import PageMenu from './PageMenu';
import TempLogin from './TempLogin';

import Accounts from './Accounts';
import Home from './Home';
import Login from './Login';
import CashFlow from './CashFlow';
import Statements from './Statements';
import SetPreferences from './SetPreferences';

class MoneyManager extends Component {

	constructor(props) {
		super(props);
		this._setNavigatorRef = this._setNavigatorRef.bind(this);
		this.setHeadersAndInfo = this.setHeadersAndInfo.bind(this);
		this.state= {'headers': null}
	}

	setHeadersAndInfo(headers, customerInfo){
		this.setState({'headers': headers, 'customerInfo': customerInfo});
	}

	setAccountId(id){
		this.setState({'accountId': id});
	}

	setTransactions(transactions){
		this.setState({transactions: transactions})
	}

	setAllTransaction(transactions){
		this.setState({allTransactions: transactions})
	}

	renderScene(route, nav) {
		switch (route.id) {
			case 'home':
				return <PageMenu navigator={nav}><Accounts navigator={nav} customerInfo={this.state.customerInfo} headers={this.state.headers} setAccountId={this.setAccountId.bind(this)} /></PageMenu>;
			case 'accounts':
				return <PageMenu navigator={nav}><Home navigator={nav} accountId={this.state.accountId} setTransactions={this.setTransactions.bind(this)} customerInfo={this.state.customerInfo} headers={this.state.headers}  /></PageMenu>;
			case 'cashFlow':
				return <PageMenu navigator={nav}>
					<CashFlow navigator={nav} 
						accountId={this.state.accountId} 
						transactions={this.state.transactions} 
						customerInfo={this.state.customerInfo}
						setAllTransaction = {this.setAllTransaction.bind(this)}
						headers={this.state.headers} />
				</PageMenu>;
			case 'aggregatedCashFlow':
				return <PageMenu navigator={nav}>
					<CashFlow navigator={nav} 
						transactions={null} 
						customerInfo={this.state.customerInfo} 
						setAllTransaction = {this.setAllTransaction.bind(this)}
						headers={this.state.headers} />
					</PageMenu>;
			case 'statement':
				return <PageMenu navigator={nav}><Statements navigator={nav} allTransactions={this.state.allTransactions} customerInfo={this.state.customerInfo} headers={this.state.headers} /></PageMenu>;
			case 'setPreferences':
				return <PageMenu navigator={nav}><SetPreferences navigator={nav} /></PageMenu>;
			default:
				//return <PageMenu navigator={nav}><CashFlow navigator={nav} accountId={this.state.accountId} customerInfo={this.state.customerInfo} headers={this.state.headers}  /></PageMenu>;
				return <TempLogin navigator={nav} setHeadersAndInfo={this.setHeadersAndInfo} />;
		}
	}

	componentWillUnmount() {
		this._listeners && this._listeners.forEach(listener => listener.remove());
	}

	_setNavigatorRef(navigator) {
		if (navigator !== this._navigator) {
			this._navigator = navigator;

			if (navigator) {
				var callback = (event) => {
					// console.log(
					// 	`NavigatorMenu: event ${event.type}`,
					// 	{
					// 		route: JSON.stringify(event.data.route),
					// 		target: event.target,
					// 		type: event.type,
					// 	}
					// );
				};
				// Observe focus change events from the owner.
				this._listeners = [
					navigator.navigationContext.addListener('willfocus', callback),
					navigator.navigationContext.addListener('didfocus', callback),
				];
			}
		}
	}
	
	render() {
		return (
			<LinearGradient colors={clrs.pageArrayBackgroundColor} style={{flex:1}}>
				<StatusBar
					backgroundColor="#212121"
					barStyle="light-content"
				/>
				<Navigator
					ref={this._setNavigatorRef}
					initialRoute={{statusBarHidden: true}}
					renderScene={this.renderScene.bind(this)}
					configureScene={(route) => {
						if (route.sceneConfig) {
							return route.sceneConfig;
						}
						return Navigator.SceneConfigs.FloatFromBottom;
					}}
				/>
			</LinearGradient>
		);
	}
};

const App = backAndroid(MoneyManager);

export default App;