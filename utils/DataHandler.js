import { AsyncStorage } from 'react-native'

export const FLASH_CARD_STORAGE_KEY = 'UdicyFlashcards:categories'

function getDummyData() {

    const data = {
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

export function newCard( category, title, question ) {
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
        [category]: {
            [title]: {
                questions: [
                    ...questions,
                    {
                        question: question.question,
                        answer: question.answer
                    }
                ]
            }
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

