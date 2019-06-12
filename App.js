import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers'
import MainContainer from './components/Navigation'
import {
	setLocalNotification,
	clearLocalNotification
} from './utils/notification'

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification()
	}
	render() {
		return (
			<Provider store={createStore(decks)}>
				<View style={styles.container}>
					{Platform.OS === 'ios' && <StatusBar barStyle='default' />}
					<MainContainer />
				</View>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
