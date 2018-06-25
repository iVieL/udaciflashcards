import { NEW_CARD, GET_DECKS } from '../_actions'

function entries(state = {}, action) {
    console.log('State? ', state);
    const { deck, card} = action
    switch (action.type) {
        case NEW_CARD:

            return {
                ...state,
                decks: {
                    ...state.decks,
                    [deck]: {
                        ...state.decks[deck],
                        questions: [
                            ...state.decks[deck].questions,
                            {
                                question: card.question,
                                answer: card.answer
                            }
                        ]
                    }
                }
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