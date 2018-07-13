import * as dataHandler from '../utils/DataHandler'

import { NEW_CARD, GET_DECKS } from '../_actions'

function entries(state = {}, action) {
    const { deck, card} = action
    switch (action.type) {
        case NEW_CARD:

            return {
                ...state,
                decks: dataHandler.addCard(state.decks, deck, card)
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