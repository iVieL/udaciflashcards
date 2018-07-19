import React, { Component } from 'react'
import {Text, StyleSheet, View } from "react-native";
import FlashCard from "./FlashCard";
import TextButton from "./TextButton";
import { lightPurp, red } from "../utils/colors";


export default class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Quiz from ${navigation.state.params.deckName} Deck!`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'forestgreen',
        },
    });


    state = {
        index: 0,
        questions: [],
        answers: [],
        card: {}
    };

    componentDidMount() {
        console.log('componentDidMount!!!!');
        const questions = this.props.navigation.getParam("questions");

        const { index } = this.state;
        const card = this.findCard(questions, index);

        this.setState(() => ({
            questions,
            card
        }));
    }

    componentWillUpdate() {
    }

    findCard = (questions, index) => {

        return questions[index];
    };

    markAsCorrect = () => {
        console.log('mark as correct!');

        const { index, questions } = this.state;

        //todo: if index > questions.length, notify and go back!

        const newIndex = index + 1;
        console.log('valores: ', newIndex, questions.length);
        //todo: trace correct answers before update status

        if(newIndex >= questions.length) {
            console.log('volamos a la picha!');
        }
        else {
            const card = this.findCard(questions, newIndex);

            this.setState(() => ({
                index: newIndex,
                card
            }))
        }
    };

    render() {
        const { card } = this.state;

        //TODO: obtains question using index
        //todo: handle correct/incorrect event
        //todo: handle end of Quiz record
        if(!card) {
            return (
                <View style={styles.container}>
                    <Text>No cards available!</Text>
                </View>

            );
        }

        return (
            <View style={styles.container}>
                <FlashCard card={card} />
                <TextButton
                    style={styles.correctButton}
                    onPress={this.markAsCorrect}
                >
                    Correct!
                </TextButton>
                <TextButton style={styles.wrongButton}>
                    Incorrect!
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4ffe0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    correctButton: {
        color: lightPurp,
        margin: 20,
        borderRadius: 2,
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrongButton: {
        color: red,
        margin: 20,
        borderRadius: 2,
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'

    }
});
