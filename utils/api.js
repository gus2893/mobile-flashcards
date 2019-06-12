import { AsyncStorage } from 'react-native'
const DECKS_KEY = 'mobile-flashcards-deckss'

export function _addDeck(name) {
	return AsyncStorage.mergeItem(
		DECKS_KEY,
		JSON.stringify({
			[name]: {
				title: name,
				cards: []
			}
		})
	)
}

export function _addCard(key, card) {
	return AsyncStorage.getItem(DECKS_KEY).then(res => {
		const data = JSON.parse(res)
		data[key] = {
			...data[key],
			cards: [...data[key].cards, card]
		}
		AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
	})
}

export function _getDecks() {
	return AsyncStorage.getItem(DECKS_KEY).then(res => {
		return JSON.parse(res)
	})
	//return AsyncStorage.removeItem(DECKS_KEY)
}

export function _removeDeck(deck) {
	return AsyncStorage.getItem(DECKS_KEY).then(res => {
		const data = JSON.parse(res)
		data[deck] = undefined
		delete data[deck]
		AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
	})
}
