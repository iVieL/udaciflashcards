import { AsyncStorage } from 'react-native'

export const FLASH_CARD_STORAGE_KEY = 'UdicyFlashcards:categories'

function getInitialData() {
    return {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
}

export function addCard(decks, deck, card) {
    return {
    ...decks,
        [deck]: {
        ...decks[deck],
            questions: [
            ...decks[deck].questions,
            {
                question: card.question,
                answer: card.answer
            }
            ]
        }
    }
}

export function addDeck(decks, deck) {
    return {
        ...decks,
        [deck]: {
            title: deck,
            questions: []
        }
    }
}

function getDummyData() {

    const data = getInitialData();

    AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(data))

    console.log('SAVING DATA!!! CHECK THIS!!');
    return data
}

export function retrieveData(results) {
    const data = results === null
        ? getDummyData()
        : JSON.parse(results)

    return data
}

export function getDecks() {
    return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
        .then(retrieveData)
}

export function newCard( category, question ) {
    getDecks()
        .then((decks) => {
            const newState = addCard(decks, category, question)
            AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(newState))
        })
}

export function newDeck( { category } ) {
    getDecks()
        .then((decks) => {
            const newState = addDeck(decks, category)
            AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(newState))
        })
}

export function addCategory( { category } ) {
    return getDecks()
        .then( (data) => {
            data[category] = {}
            AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, data)
            return data
        })
}

export function removeAll() {
    return AsyncStorage.removeItem(FLASH_CARD_STORAGE_KEY)
}

