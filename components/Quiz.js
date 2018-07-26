import React, { Component } from 'react'
import {Modal, Text, StyleSheet, View, TouchableHighlight } from "react-native";
import FlashCard from "./FlashCard";
import TextButton from "./commons/TextButton";
import {darkYellow, lightPurp, pink} from "../utils/colors";
import { registerQuizResult } from "../utils/DataHandler";
import {clearLocalNotification, setLocalNotification} from "../utils/NotificationHandler";
import CustomText from "./commons/CustomText";


export default class Quiz extends Component {
    // noinspection JSUnusedGlobalSymbols
    static navigationOptions = ({ navigation }) => ({
        title: `Quiz from ${navigation.state.params.deck} Deck!`,
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
        //console.log('mark as ', correct ? 'correct!': 'incorrect!');

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

    finishQuizAndBack = () => {
        return this.finishQuiz(true);
    };

    finishQuizAndTryAgain = () => {
        return this.finishQuiz(false);
    };

    resetStatus = () => {
        const {questions} = this.state;
        const card = this.findCard(questions, 0);
        this.setState(() => ({
            index: 0,
            answers: [],
            card: card,
            summaryModalVisible: false
        }));
    };

    finishQuiz = (back) => {
        this.handleSummaryModal(false);
        const { navigation } = this.props;

        const {answers} = this.state;
        const correct = answers.filter((item) => item === 1).reduce((a, b) => a + b, 0);
        const incorrect = answers.filter((item) => item === 0).reduce((a, b) => a + 1, 0);

        registerQuizResult(correct, incorrect, navigation.getParam("deck"), new Date());

        if(back) {
            navigation.goBack();
        } else {
            this.resetStatus();
        }

        // Clear notification
        clearLocalNotification()
            .then(setLocalNotification);
    };

    buildSummaryModal = (visible) => {
        const {answers} = this.state;
        const correct = answers.filter((item) => item === 1).reduce((a, b) => a + b, 0);
        const incorrect = answers.filter((item) => item === 0).reduce((a, b) => a + 1, 0);

        const score = (correct / answers.length) * 100; // percentage
        return (
            <View>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={visible}
                    onRequestClose={this.finishQuizAndBack}
                >
                    <View style={styles.container}>
                        <CustomText title>Summary Quiz</CustomText>
                        <View style={{paddingTop: 20}}/>
                        <CustomText >Correct answers: {correct}</CustomText>
                        <CustomText>Incorrect answers: {incorrect}</CustomText>
                        <View style={{paddingTop: 20}}/>
                        <CustomText mid>Your Score is: {score.toFixed(2)}%</CustomText>
                        <CustomText mid>Keep learning folk!</CustomText>
                        <View style={{paddingTop: 40}}/>
                        <TextButton onPress={this.finishQuizAndBack} style={styles.defaultButton}>
                            Continue
                        </TextButton>
                        <TextButton onPress={this.finishQuizAndTryAgain} style={styles.tryAgainButton}>
                            Try Again
                        </TextButton>
                    </View>

                </Modal>
            </View>
        )
    };

    render() {
        const { card, summaryModalVisible, questions, index } = this.state;

        if(!card) {
            return (
                <View style={styles.container}>
                    <Text style={styles.defaultText}>No cards available!</Text>
                </View>

            );
        }

        return (
            <View style={styles.mainContainer}>

                <View>
                    <CustomText tiny style={{marginTop: 40}}>
                        {index+1}/{questions.length}
                    </CustomText>
                </View>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    correctButton: {
        backgroundColor: lightPurp,
        width: 150,
    },
    wrongButton: {
        backgroundColor: pink,
        width: 150,
    },
    defaultText: {
        fontSize: 18,
        textAlign: 'center'
    },
    titleText: {
        fontWeight: 'bold'
    },
    defaultButton: {
        backgroundColor: 'green',
        width: 150,
    },
    tryAgainButton: {
        backgroundColor: darkYellow,
        width: 150,
    }
});
