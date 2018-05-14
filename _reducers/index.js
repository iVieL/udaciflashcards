import { NEW_CARD } from '../_actions'

function entries(state = {}, action) {
    switch (action.type) {
        case NEW_CARD:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default entries