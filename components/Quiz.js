import React, { Component } from 'react'
import {FlatList, StyleSheet, View} from "react-native";
import FlashCard from "./FlashCard";

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
        answers: []
    };

    componentDidMount() {
        const questions = this.props.navigation.getParam("questions");
        this.setState(() => ({
            questions: questions
        }));
    }

    render() {
        const {questions} = this.state;

        //TODO: obtains question using index
        //todo: handle correct/incorrect event
        //todo: handle end of Quiz record
        return (
            <View style={styles.container}>
                <FlatList
                    data={ questions }
                    renderItem={({item}) =>
                        <FlashCard card = {item}/>
                    }
                    keyExtractor={(item)=>item.question}
                />
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
    }
});
