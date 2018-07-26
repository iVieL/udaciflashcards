import React, { Component } from 'react'
import {FlatList, StyleSheet, View} from "react-native";
import FlashCard from "./FlashCard";

export default class CardList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Cards in ${navigation.state.params.deckName}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'dodgerblue',
        },
    });



    render() {
        const questions = this.props.navigation.getParam("questions");

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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
