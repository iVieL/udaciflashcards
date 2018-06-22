import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDecks} from "../utils/DataHandler";


class ViewCountQuestionItem extends Component {

    render() {
        const { counter, navigation } = this.props
        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate(
                    'ViewQuestions',
                    {
                        singleView: true })}>
                <View>
                    <Text style={styles.itemContentText}>
                        View Cards ({counter})
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }
}

class ViewAddCardItem extends Component {
    render() {
        //todo: pass deck id to here
        const { deckName, navigation } = this.props
        console.log("Add Card to: ", deckName);

        return (
            <TouchableOpacity onPress={() =>
                navigation.push(
                    'AddQuestion',
                    {
                        deck: deckName })}>
                <View>
                    <Text style={styles.itemContentText}>
                        Add Card
                    </Text>

                </View>
            </TouchableOpacity>

        )
    }
}

class ViewStartQuizItem extends Component {
    render() {
        const { deckName, navigation } = this.props

        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate(
                    'StartQuiz',
                    {
                        deck: deckName })}>
                <View>
                    <Text style={styles.itemContentText}>
                        Start Quiz with this deck!
                    </Text>

                </View>
            </TouchableOpacity>

        )
    }
}

function SingleViewComponent( { data, navigator }) {
    const COUNTER ='counter'
    const ADD_QUESTION = 'add_question'
    const START_QUIZ = 'start_quiz'


    return (
        <FlatList
            data={ [COUNTER, ADD_QUESTION, START_QUIZ]}
            renderItem={({item}) => {
                switch(item) {
                    case COUNTER:
                        return (
                            <View style={styles.listItem}>
                                <ViewCountQuestionItem
                                    counter={data.questions.length}
                                    navigation={navigator}/>
                            </View>
                        )
                    case ADD_QUESTION:
                        return (
                            <View style={styles.listItem}>
                                <ViewAddCardItem
                                    deckName={data.title}
                                    navigation={navigator}
                                />
                            </View>
                        )
                    case START_QUIZ:
                        return (
                            <View style={styles.listItem}>
                                <ViewStartQuizItem
                                    deckName={data.title}
                                    navigation={navigator}
                                />
                            </View>
                        )
                    default:
                        return (
                            <View style={styles.listItem}>
                                <Text>Nothing to show here!</Text>
                            </View>
                        )
                }
            }}
            keyExtractor={(item)=>item}
        />
    )
}
/*
*/


export default class Deck extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    render() {
        const { navigation } = this.props

        if(!!navigation) {
            return (
                <View>
                    <SingleViewComponent
                        navigator={navigation}
                        data={{
                        title: navigation.getParam('title', ''),
                        questions: navigation.getParam('questions', [])
                    }}/>
                </View>
            )

        }
        return (
            <View>
                <Text>Nothing to show!</Text>
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
    },
    listItem: {
        height: 75,
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 25

    },
    itemContentText: {
        fontSize: 16
    }
});
