import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
	clearLocalNotification,
	setLocalNotification
} from '../utils/notification'

class Quiz extends React.Component {
	state = {
		question: 0,
		correct: 0,
		incorrect: 0,
		showAnswer: false
	}
	render() {
		const { deck } = this.props
		const { question, correct, incorrect, showAnswer } = this.state
		if (deck.cards.length === 0) {
			return (
				<View style={styles.container}>
					<Text style={styles.title}>
						Sorry, you cannot take a quiz because there is no cards in the deck.
					</Text>
				</View>
			)
		}
		if (question === deck.cards.length) {
			clearLocalNotification()
			setLocalNotification()
			return (
				<View style={styles.container}>
					<Text style={[styles.title, { fontSize: 45, flex: 1, margin: 15 }]}>
						Quiz Completed
					</Text>
					<View style={{ flex: 2 }}>
						<Text style={styles.title}>{`${correct}/${
							deck.cards.length
						} Correct`}</Text>
						<TouchableOpacity
							style={[styles.button, { backgroundColor: 'black' }]}
							onPress={() =>
								this.setState({
									question: 0,
									correct: 0,
									incorrect: 0,
									showAnswer: false
								})
							}
						>
							<Text style={{ color: 'white' }}>Restart Quiz</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => this.props.navigation.goBack()}
						>
							<Text>Back to Deck</Text>
						</TouchableOpacity>
					</View>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<Text style={{ flex: 1, fontSize: 15 }}>
					{`Question ${question + 1} out of ${deck.cards.length} `}
				</Text>
				<View style={{ flex: 3, textAlign: 'center', alignItems: 'center' }}>
					<Text style={[styles.title, { margin: 10 }]}>
						{showAnswer === false
							? deck.cards[question].question
							: deck.cards[question].answer}
					</Text>
					<TouchableOpacity
						onPress={() => this.setState({ showAnswer: !showAnswer })}
					>
						<Text style={{ color: 'red' }}>
							{showAnswer === false ? 'Show Answer' : 'Show Question'}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 3 }}>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: 'green' }]}
						onPress={() =>
							this.setState({
								correct: correct + 1,
								question: question + 1,
								showAnswer: false
							})
						}
					>
						<Text style={{ color: 'white' }}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: 'red' }]}
						onPress={() =>
							this.setState({
								showAnswer: false,
								incorrect: incorrect + 1,
								question: question + 1
							})
						}
					>
						<Text style={{ color: 'white' }}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
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
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center'
	}
})

const mapStateToProps = (decks, { navigation }) => {
	return {
		deck: decks[navigation.state.params.deckId]
	}
}
export default connect(mapStateToProps)(Quiz)
