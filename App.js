import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './_reducers'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import AddEntry from './components/AddEntry'
import Deck from './components/Deck'


/*
    TODO:
    - Handle flashcards: it is part of a deck and has two sides, one for title/concept and the other with explanation
    - Handle Deck: some specific theme/category of flashcards
    - Handle Decks: user can have more than one category
    - Handle quizzes on those decks

    Specification:
    - Allow users to create a deck which can hold an unlimited number of cards
    - Allow users to add a card to a specific deck
    - The front of the card should display the question
    - The back of the card should display the answer
    - Users should be able to quiz themselves on a specific deck and receive a score once they're done.
    - Users should receive a notification to remind themselves to study if they haven't already for that day.

    Views:
    1. Deck list view (default view)
        1.1. Display the title of each Deck
        1.2. Display the number of cards in each deck
    2. Individual deck view
        2.1. Display title of the deck
        2.2. display the number of cards in the deck
        2.3. display an option to start a quiz on this specific deck
        2.4. An option to add a new question to the deck
    3. Quiz view
        3.1. display card question
        3.2. an option to view the answer (flips the card) / if the answer is shown an option to view the question
        3.3. a "Correct" button
        3.4. an Incorrect button
        3.5. the number of cards left in the quiz
        3.6. Display the percentage correct once the quiz is complete
    4. New Deck view
        4.1. An option to enter the title for the new deck
        4.2. An option to submit the new deck title
    5. New question view
        5.1. An option to enter in the question
        5.2. An option to enter in the answer
        5.3. An option to submit the new question

 */

const Tabs = createMaterialTopTabNavigator({
    Decks: {
        screen: DeckList
    },
    'Dash Board': {
        screen: NewDeck
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs
    },
    SingleDeck: {
        screen: Deck
    },
    AddDeck: {
        screen: NewDeck
    },
    AddQuestion: {
        screen: AddEntry
    },
    ViewQuestions: {
        screen: AddEntry
    },
    StartQuiz: {
        screen: AddEntry
    }

})

export default class App extends React.Component {

    render() {

        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}
