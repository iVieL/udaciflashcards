import React, {Component} from 'react'
import { newCard, getDecks } from "../utils/DataHandler";
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native";
import { purple, white } from "../utils/colors"
import { connect } from 'react-redux'
import { addCard } from '../_actions'


class AddEntry extends Component {
    state = {
        question: '',
        answer: ''
    }

    static navigationOptions = ({ navigation }) => ({
        title: `Add Card to ${navigation.state.params.deck}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'green',
        },
    });


    componentDidMount() {
    }

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
                    <Text>Question:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.setQuestion}
                        value={question}
                        maxLenght={30}
                    />
                    <Text>Answer:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.setAnswer}
                        value={answer}
                        maxLenght={30}
                    />
                    <TouchableOpacity
                        style={styles.androidSubmitBtn}
                        onPress={this.submit}
                    >
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
            <View style={styles.container}>
                <Text>Loading</Text>
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
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
});

function mapStateToProps(state) {
    console.log("mapStateToProps");
    return {

    }

}
export default connect(mapStateToProps)(AddEntry)