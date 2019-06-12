import React from 'react'
import {
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	KeyboardAvoidingView
} from 'react-native'
import { _addCard } from '../utils/api'
import { addCard } from '../actions/index'
import { connect } from 'react-redux'

class AddCard extends React.Component {
	static navigationOptions = {
		title: 'Add Card'
	}

	state = {
		question: '',
		answer: ''
	}

	onButtonPress = () => {
		const { question, answer } = this.state
		_addCard(this.props.navigation.state.params.deckId, {
			question,
			answer
		}).then(() => {
			this.props.dispatch(
				addCard(this.props.navigation.state.params.deckId, {
					question,
					answer
				})
			)
			this.props.navigation.goBack()
		})
	}
	render() {
		const { question, answer } = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<TextInput
					placeholder={'Question'}
					style={styles.textBox}
					value={question}
					onChangeText={question => this.setState({ question })}
				/>
				<TextInput
					placeholder={'Answer'}
					style={styles.textBox}
					value={answer}
					onChangeText={answer => this.setState({ answer })}
				/>
				<TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
					<Text>Submit</Text>
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
		fontWeight: 'bold'
	}
})

export default connect()(AddCard)
