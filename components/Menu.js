import React, {Component} from 'react';
import {
	ScrollView,
	Text,
	View,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { List, ListItem, Icon, SocialIcon } from 'react-native-elements';
import clrs from '../utils/Clrs';

const {height, width} = Dimensions.get('window');

const list = [
	{
		name: 'Home',
		icon: 'home',
		subtitle: 'Your sweet home',
		key: 'home',
	},
	{
		name: 'Cash flow',
		icon: 'av-timer',
		subtitle: 'Click to see latest cash flow',
		key: 'cashFlow',
	},
	{
		name: 'USD',
		icon: 'find-in-page',
		subtitle: 'Search for a lunch partner',
		key: 'search',
	},
	{
		name: 'XMR',
		icon: 'history',
		subtitle: 'See lunches history',
		key: 'history',
	},
	{
		name: 'ETH',
		icon: 'card-giftcard',
		subtitle: 'Check/Redeem your reward points',
		key: 'rewards',
	},
	{
		name: 'Logout',
		icon: 'block',
		subtitle: 'See you again',
		key: 'logout',
	},
]


export default class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView scrollsToTop={false} style={styles.menu}>
				<View style={styles.appTitleView}>
					<Text style={styles.appTitle}>Money Manager</Text>
				</View>
				<List containerStyle={{ marginTop:13, backgroundColor:clrs.textPrimaryColor}}>
				  {
				    list.map((l, i) => (
				      <ListItem
				        leftIcon={{name: l.icon}}
				        onPress={() => this.props.onItemSelected(l.key)}
				        key={i}
				        title={l.name}
				        subtitle={l.subtitle}
				      />
				    ))
				  }
				</List>

			</ScrollView>
		);
	}

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    paddingTop:15,
		paddingBottom:105
  },
  appTitleView:{
    paddingLeft:45,
    flexDirection:'row'
  },
  appTitle:{
    fontSize:24,
    marginLeft:10,
		flex:1,
    color:clrs.textPrimaryColor
  },
});