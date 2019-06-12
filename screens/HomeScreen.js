import React from 'react'
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList
} from 'react-native'
import { _getDecks, _addDeck, _addQuestion } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class HomeScreen extends React.Component {
	componentDidMount() {
		_getDecks().then(r => {
			this.props.dispatch(receiveDecks(r))
		})
	}
	renderItem = ({ item }) => {
		const { navigate } = this.props.navigation
		return (
			<TouchableOpacity
				style={styles.deck}
				onPress={() =>
					navigate('Deck', { deckId: item.title, title: item.title })
				}
			>
				<Text style={styles.title}>{item.title}</Text>
				<Text>{`${item.cards.length} cards`}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		const { decks } = this.props

		const deckData = Object.values(decks)
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.container}
					data={deckData}
					renderItem={this.renderItem}
					keyExtractor={(item, index) => item.title}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	deck: {
		padding: 15,
		alignItems: 'center'
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold'
	}
})
const mapStateToProps = decks => {
	return {
		decks
	}
}
export default connect(mapStateToProps)(HomeScreen)
