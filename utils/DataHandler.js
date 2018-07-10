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

function getDummyData() {

    const data = getInitialData();

    AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(data))

    console.log('SAVING DATA!!! CHECK THIS!!');
    return data
}

export function generateNewCard(data, deck, question, answer) {
    return {
        question,
        answer
    }
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
    //todo: recuperar items del storage, add el nuevo elemento y luego set al storage... no se podra con merge
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
        [category]: {
            questions: [
                {
                    question: question.question,
                    answer: question.answer
                }
            ]
        }
    }))
}

export function addDeck( { category, title} ) {
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
        [category]: {
            title
        }
    }))
}

export function addCategory( { category } ) {
    return getDecks()
        .then( (data) => {
            data[category] = {}
            AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, data)
            return data
        })
}

//TODO: remove Card?
export function removeCard({category, title}) {

}

