import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { _removeDeck } from '../utils/api'
import { removeDeck } from '../actions'

class DeckDetails extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.title}`
	})
	deleteDeck = () => {
		const { deck } = this.props
		_removeDeck(deck.title).then(r => {
			this.props.dispatch(removeDeck(deck.title))
			this.props.navigation.goBack()
		})
	}
	render() {
		const { deck } = this.props
		if (!deck) {
			return null
		}
		return (
			<View style={styles.container}>
				<View style={[styles.container, { alignItems: 'center' }]}>
					<Text style={styles.title}>{deck.title}</Text>
					<Text>{deck.cards.length} cards</Text>
				</View>

				<View style={{ flex: 1 }}>
					<TouchableOpacity
						style={styles.button}
						onPress={() =>
							this.props.navigation.navigate('AddCard', { deckId: deck.title })
						}
					>
						<Text>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, { backgroundColor: 'black' }]}
						onPress={() =>
							this.props.navigation.navigate('Quiz', { deckId: deck.title })
						}
					>
						<Text style={{ color: 'white' }}>Start Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.deleteDeck} style={styles.deck}>
						<Text style={{ color: 'red' }}>Delete Deck</Text>
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
	deck: {
		padding: 15,
		alignItems: 'center'
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold'
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		borderStyle: 'solid',
		borderRadius: 15,
		borderWidth: 1,
		padding: 20,
		margin: 20
	}
})

const mapStateToProps = (decks, props) => {
	return {
		deck: decks[props.navigation.state.params.deckId]
	}
}
export default connect(mapStateToProps)(DeckDetails)
