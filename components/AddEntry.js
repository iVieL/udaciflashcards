import React, {Component} from 'react'
import {getDecks} from "../utils/DataHandler";
import {StyleSheet, View, Text} from "react-native";

export default class AddEntry extends Component {
    state = {
        decks: null
    }

    componentDidMount() {
        getDecks()
            .then((json) => {
                console.log('setting state: ', json)
                this.setState(() => ({
                    decks: JSON.stringify(json)
                }))
            }).done()
    }

    render() {
        const { decks } = this.state

        return (
            <View style={styles.container}>
                <Text>{decks}</Text>
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
});
