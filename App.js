import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


/*
    TODO:
    - Handle flashcards: it is part of a deck and has two sides, one for title/concept and the other with explanation
    - Handle Deck: some specific theme/category of flashcards
    - Handle Decks: user can have more than one category
    - Handle quizzes on those decks

    Views:
    1. Deck list view (default view)
        1.1. Display the title of each Deck
        1.2. Display the number of cards in each deck
    2. Individual deck view
        2.1. Dispaly title of the deck
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

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});