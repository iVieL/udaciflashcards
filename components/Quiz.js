import React, { Component } from 'react'
import {Modal, Text, StyleSheet, View, TouchableHighlight } from "react-native";
import FlashCard from "./FlashCard";
import TextButton from "./TextButton";
import { lightPurp, red } from "../utils/colors";


export default class Quiz extends Component {
    // noinspection JSUnusedGlobalSymbols
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
        card: {},
        summaryModalVisible: false
    };

    componentDidMount() {
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

    handleSummaryModal = (visible) => {
        this.setState({summaryModalVisible: visible})
    };

    markAs = (correct) => {
        console.log('mark as ', correct ? 'correct!': 'incorrect!');

        const { index, questions, answers } = this.state;

        answers[index] = correct ? 1: 0;

        const newIndex = index + 1;

        if(newIndex >= questions.length) {
            this.handleSummaryModal(true);
        }
        else {
            const card = this.findCard(questions, newIndex);

            this.setState(() => ({
                index: newIndex,
                card
            }))
        }
    };

    markAsCorrect = () => {
        this.markAs(true);
    };

    markAsIncorrect = () => {
        this.markAs(false);
    };

    finishQuiz = () => {
        console.log('sumary modal will be close');
        this.handleSummaryModal(false);
        const { navigation } = this.props;
        //todo: persist statistics on storage
        navigation.goBack();
    };

    buildSummaryModal = (visible) => {
        const {answers} = this.state;
        const correct = answers.filter((item) => item === 1).reduce((a, b) => a + b, 0);
        const incorrect = answers.filter((item) => item === 0).reduce((a, b) => a + 1, 0);

        return (
            <View>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={visible}
                    onRequestClose={this.finishQuiz}
                >
                    <View style={styles.container}>
                        <Text style={styles.titleText}>Summary Quiz</Text>
                        <View style={{paddingTop: 20}}/>
                        <Text style={styles.defaultText}>Correct answers: {correct}</Text>
                        <Text style={styles.defaultText}>Incorrect answers: {incorrect}</Text>
                        <View style={{paddingTop: 20}}/>
                        <Text style={styles.midSizeText}>Keep learning folk!</Text>
                        <View style={{paddingTop: 40}}/>
                        <TouchableHighlight style={styles.defaultButton} onPress={this.finishQuiz}>
                            <Text style={[styles.defaultText, {color: 'white'}]}>Continue</Text>
                        </TouchableHighlight>
                    </View>

                </Modal>
            </View>
        )
    };

    render() {
        const { card, summaryModalVisible } = this.state;

        if(!card) {
            return (
                <View style={styles.container}>
                    <Text style={styles.defaultText}>No cards available!</Text>
                </View>

            );
        }

        return (
            <View style={styles.container}>
                {this.buildSummaryModal(summaryModalVisible)}
                <FlashCard card={card} />
                <TextButton
                    style={styles.correctButton}
                    onPress={this.markAsCorrect}
                >
                    Correct!
                </TextButton>
                <TextButton
                    style={styles.wrongButton}
                    onPress={this.markAsIncorrect}
                >
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
    },
    defaultText: {
        fontSize: 18,
        textAlign: 'center'
    },
    midSizeText: {
        fontSize: 21,
        textAlign: 'center'
    },
    titleText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    defaultButton: {
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10
    }
});
