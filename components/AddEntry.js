import React, {Component} from 'react'
import { newCard } from "../utils/DataHandler";
import {StyleSheet, View, TextInput} from "react-native";
import { purple, white } from "../utils/colors"
import { connect } from 'react-redux'
import { addCard } from '../_actions'
import CustomText from "./commons/CustomText";
import TextButton from "./commons/TextButton";


class AddEntry extends Component {
    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => ({
        title: `Add Card to ${navigation.state.params.deck}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'green',
        },
    });


    setQuestion = (question) => {
        this.setState(() => ({
            question
        }))
    }

    setAnswer = (answer) => {
        this.setState(() => ({
            answer
        }))
    }

    submit = () => {
        const { navigation } = this.props
        const { question, answer } = this.state
        const deck = navigation.state.params.deck

        const card = {
            question,
            answer
        }
        this.props.dispatch(addCard(card, deck))

        this.setState(() => ({
            question: '',
            answer: ''
        }))

        this.back()

        newCard(deck, card)
    }

    back = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props
        const { question, answer } = this.state

        if(!!navigation) {
            return (
                <View style={styles.container}>
                    <CustomText>Question</CustomText>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.setQuestion}
                        value={question}
                        maxLenght={30}
                    />
                    <CustomText>Answer</CustomText>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.setAnswer}
                        value={answer}
                        maxLenght={30}
                    />
                    <TextButton onPress={this.submit} style={styles.submitBtn}>
                        Submit
                    </TextButton>

                </View>
            )
        } else {
            return (
            <View style={styles.container}>
                <CustomText>Loading</CustomText>
            </View>
            )
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    submitBtn: {
        width: 150,
        backgroundColor: purple
    },
});

function mapStateToProps(state) {
    return {

    }

}
export default connect(mapStateToProps)(AddEntry)