export const NEW_CARD = 'NEW_CARD'

export function addCard(card) {
    return {
        type: NEW_CARD,
        card
    }
}