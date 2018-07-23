import * as dataHandler from '../utils/DataHandler'

import { NEW_CARD, GET_DECKS, NEW_DECK } from '../_actions'

function entries(state = {}, action) {
    const { deck, card} = action
    switch (action.type) {
        case NEW_CARD:

            return {
                ...state,
                decks: dataHandler.addCard(state.decks, deck, card)
            };
        case NEW_DECK:

            return {
                ...state,
                decks: dataHandler.addDeck(state.decks, deck)
            };
        case GET_DECKS:
            return {
                ...state,
                decks: action.decks
            };
        default:
            return state
    }
}

export default entries