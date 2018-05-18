import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {getDecks} from "../utils/DataHandler";

export default class Deck extends Component {

    render() {
        const { dataSource } = this.props
        console.log('PROPS!! ', this.props);
        return (
            <View>
                <Text>{dataSource.title}</Text>
                <Text>Counts: {Object.keys(dataSource.questions).length}</Text>
            </View>
        )
    }
}
