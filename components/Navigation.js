import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import DeckDetails from '../screens/DeckDetails'
import AddCard from '../screens/AddCard'
import AddDeck from '../screens/AddDeck'
import Quiz from '../screens/Quiz'
import { FontAwesome5 } from '@expo/vector-icons'
import {
	createAppContainer,
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation'

const Tabs = createBottomTabNavigator({
	Decks: {
		screen: HomeScreen,
		navigationOptions: {
			tabBarIcon: () => <FontAwesome5 name='folder-open' size={30} />
		},
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray'
		}
	},
	addDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarIcon: () => <FontAwesome5 name='folder-plus' size={30} />
		}
	}
})

const MainContainer = createStackNavigator({
	Home: {
		screen: Tabs
	},
	Deck: {
		screen: DeckDetails
	},
	AddCard: {
		screen: AddCard
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			title: 'Quiz'
		}
	}
})

export default createAppContainer(MainContainer)
