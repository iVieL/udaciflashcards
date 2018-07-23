export const NEW_CARD = 'NEW_CARD'
export const GET_DECKS = 'GET_DECKS'
export const NEW_DECK = 'NEW_DECK'

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

export function newDeck(deck) {
    return {
        type: NEW_DECK,
        deck
    }
}