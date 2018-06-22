import React, {Component} from 'react'
import {getDecks} from "../utils/DataHandler";
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native";
import { purple, white } from "../utils/colors"
import { connect } from 'react-redux'


class AddEntry extends Component {
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

    submit = () => {
        const { navigation } = this.props
        const { question, answer } = this.state
        console.log('submitting', question, answer, navigation.state.params.deck)
        this.setState(() => ({
            question: '',
            answer: ''
        }))

        this.back()
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
    return {

    }

}
export default connect(mapStateToProps)(AddEntry)