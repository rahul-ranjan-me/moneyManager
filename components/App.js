import React, {Component} from 'react';
import {
  Navigator,
  View,
  Text,
} from 'react-native';
import clrs from '../utils/Clrs';

import PageMenu from './PageMenu';
import TempLogin from './TempLogin';

import Accounts from './Accounts';
import Home from './Home';
import Login from './Login';
import CashFlow from './CashFlow';
// import SearchPartner from './SearchPartner';
// import History from './History';
// import Rewards from './Rewards';
// import ExpressInvite from './ExpressInvite';

export default class MoneyManager extends Component {

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
		console.log('app');
		this.setState({'accountId': id});
	}

	renderScene(route, nav) {
		switch (route.id) {
			case 'home':
				return <PageMenu navigator={nav}><Accounts navigator={nav} customerInfo={this.state.customerInfo} headers={this.state.headers} setAccountId={this.setAccountId.bind(this)} /></PageMenu>;
			case 'accounts':
				return <PageMenu navigator={nav}><Home navigator={nav} accountId={this.state.accountId} customerInfo={this.state.customerInfo} headers={this.state.headers}  /></PageMenu>;
			case 'cashFlow':
				return <PageMenu navigator={nav}><CashFlow navigator={nav} customerInfo={this.state.customerInfo} headers={this.state.headers} /></PageMenu>;
			default:
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
					console.log(
						`NavigatorMenu: event ${event.type}`,
						{
							route: JSON.stringify(event.data.route),
							target: event.target,
							type: event.type,
						}
					);
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
			<Navigator
				ref={this._setNavigatorRef}
				initialRoute={{id: 'first'}}
				renderScene={this.renderScene.bind(this)}
				style={{backgroundColor: clrs.darkPrimaryColor}}
				configureScene={(route) => {
					if (route.sceneConfig) {
						return route.sceneConfig;
					}
					return Navigator.SceneConfigs.FloatFromBottom;
				}}
			/>
		);
	}
};