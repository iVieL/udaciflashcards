export const NEW_CARD = 'NEW_CARD'
export const GET_DECKS = 'GET_DECKS'

export function addCard(card, deck) {
    return {
        type: NEW_CARD,
        card,
        deck
    }
}

export function receiveDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}