export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RESET = 'RESET'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	}
}

export function resetRedux() {
	return {
		type: RESET
	}
}

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function removeDeck(deck) {
	return {
		type: REMOVE_DECK,
		deck
	}
}
export function addCard(id, card) {
	return {
		type: ADD_CARD,
		payload: {
			id,
			card
		}
	}
}
