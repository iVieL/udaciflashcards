import React, {Component} from 'react'
import {getDecks} from "../utils/DataHandler";
import {StyleSheet, View, Text, TextInput} from "react-native";

export default class AddEntry extends Component {
    state = {
        decks: null,
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
        getDecks()
            .then((json) => {
                console.log('setting state: ', json)
                this.setState(() => ({
                    decks: JSON.stringify(json)
                }))
            }).done()
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

    render() {
        const { navigation } = this.props
        const { question, answer } = this.state

        console.log('Add Entry', question, answer);
        if(!!navigation) {
            return (
                <View style={styles.container}>
                    <Text>Question:</Text>
                    <TextInput
                        onChangeText={this.setQuestion}
                        value={question}
                        maxLenght={30}
                    />
                    <Text>Answer:</Text>
                    <TextInput
                        onChangeText={this.setAnswer}
                        value={answer}
                        maxLenght={30}
                    />
                    <Text>Hola mundo! {navigation.getParam('deck', 'NO_DECK')}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
