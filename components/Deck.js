import React, {Component} from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux'
import CustomText from "./commons/CustomText";


class ViewCountQuestionItem extends Component {

    render() {
        const { questions, navigation, deckName } = this.props
        const counter = !!questions ? questions.length: 0;

        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate('ViewQuestions', { singleView: true, deckName, questions })}>
                <View>
                    <CustomText big >
                        View Cards ({counter})
                    </CustomText>

                </View>
            </TouchableOpacity>
        )
    }
}

class ViewAddCardItem extends Component {
    render() {
        const { deckName, navigation } = this.props

        return (
            <TouchableOpacity onPress={() =>
                navigation.push(
                    'AddQuestion', { deck: deckName })}>
                <View>
                    <CustomText big>
                        Add Card
                    </CustomText>

                </View>
            </TouchableOpacity>

        )
    }
}

class ViewStartQuizItem extends Component {
    render() {
        const { deckName, navigation, questions } = this.props

        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate(
                    'StartQuiz', { deck: deckName, questions })}>
                <View>
                    <CustomText big>
                        Start Quiz
                    </CustomText>

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
                                    questions={ data.questions }
                                    navigation={ navigator }
                                    deckName={ data.title }
                                />
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
                                    questions={ data.questions }
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


class Deck extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'#A88DFF'
        },
    });

    render() {
        const { navigation } = this.props
        const title = navigation.getParam('title', '')

        if(!!navigation) {
            const questions = this.props.decks[title].questions
            return (
                <View style={styles.container}>
                    <SingleViewComponent
                        navigator={navigation}
                        data={{
                        title: title,
                        questions: questions
                    }}/>
                </View>
            )

        }
        return (
            <View>
                <CustomText>Nothing to show!</CustomText>
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
        alignItems: 'center',
        paddingTop: 20
    },
});

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(Deck)