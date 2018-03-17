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
		name: 'Agreegated Cash flow',
		icon: 'av-timer',
		subtitle: 'Click to see latest cash flow',
		key: 'aggregatedCashFlow',
	},
	{
		name: 'Set Preferences',
		icon: 'av-timer',
		subtitle: 'Click to set your budget target',
		key: 'setPreferences',
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
				<List containerStyle={{ marginTop:13, backgroundColor:'rgba(0,0,0,0)', borderBottomColor:'rgba(0,0,0,0)'}}>
				  {
				    list.map((l, i) => (
				      <ListItem
				        leftIcon={{name: l.icon}}
				        onPress={() => this.props.onItemSelected(l.key)}
				        key={i}
				        title={l.name}
								containerStyle={{borderBottomColor:'rgba(255,255,255,0.1)'}} 
								titleStyle = {{color:'#CAD1E2', textShadowColor:'#000', textShadowOffset:{width:1, height:1}}}
								subtitleStyle = {{color:'#94A3C5'}}
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
    color:clrs.textPrimaryColor,
		textShadowColor:'#000',
		textShadowOffset:{width:1, height:1}
  },
});