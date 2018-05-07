import { AsyncStorage } from 'react-native'

export const FLASH_CARD_STORAGE_KEY = 'UdicyFlashcards:categories'

function getDummyData() {
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

export function retrieveData(results) {
    return results == null
        ? getDummyData()
        : JSON.parse(results)
}

export function fetchCardsData() {
    return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
        .then(retrieveData)
}

export function addCard( { category, title, question} ) {
    return AsyncStorage.mergeItem(FLASH_CARD_STORAGE_KEY, JSON.stringify({
        [category]: {
            [title]: {
                questions: [
                    ...questions,
                    {
                        question: question.question,
                        answer: question.answser
                    }
                ]
            }
        }
    }))
}

//TODO: remove Card?
export function removeCard({category, title}) {

}

