import {
	RECEIVE_DECKS,
	ADD_DECK,
	ADD_CARD,
	RESET,
	REMOVE_DECK
} from '../actions'
import _ from 'lodash'

function decks(state = {}, action) {
	switch (action.type) {
		case RESET:
			return (state = {})
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			}
		case ADD_DECK:
			return {
				...state,
				[action.deck]: {
					title: action.deck,
					cards: []
				}
			}
		case ADD_CARD:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					cards: [...state[action.payload.id].cards, action.payload.card]
				}
			}
		case REMOVE_DECK:
			return _.omit(state, action.deck)
		default:
			return state
	}
}

export default decks
