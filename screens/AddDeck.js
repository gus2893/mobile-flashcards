import React from 'react'
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	KeyboardAvoidingView
} from 'react-native'
import { _addDeck } from '../utils/api'
import { addDeck } from '../actions/index'
import { connect } from 'react-redux'

class AddDeck extends React.Component {
	static navigationOptions = {
		title: 'Add Deck'
	}

	state = {
		value: ''
	}

	onButtonPress = () => {
		const { value } = this.state
		_addDeck(value).then(() => {
			this.props.dispatch(addDeck(value))
			this.setState({ value: '' })
			this.props.navigation.navigate('Deck', { deckId: value })
		})
	}
	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={{ alignItems: 'center' }}>
					<Text style={styles.title}>What is the title of your new deck?</Text>
				</View>

				<TextInput
					style={[styles.textBox, { padding: 10 }]}
					value={this.state.value}
					onChangeText={value => this.setState({ value })}
				/>
				<TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
					<Text>Create Deck</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'stretch',
		paddingHorizontal: 20
	},
	textBox: {
		borderStyle: 'solid',
		borderWidth: 1,
		padding: 20,
		margin: 20
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		borderStyle: 'solid',
		borderRadius: 15,
		borderWidth: 1,
		padding: 20,
		margin: 20
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center'
	}
})

export default connect()(AddDeck)
