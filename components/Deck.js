import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {getDecks} from "../utils/DataHandler";

export default class Deck extends Component {

    render() {
        const {item, listView, singleView} = this.props
        console.log('PROPS!! ', this.props);
        if(listView) {
            return (
                <View key={item.title} style={styles.listItem}>
                    <Text style={styles.itemTitle}>
                        {item.title}
                    </Text>
                    <Text style={styles.itemContentText}>
                        {item.questions.length} Cards
                    </Text>
                </View>
            )
        }
        if(singleView) {
            return (
                <View>
                    <Text>Sinble View!!</Text>
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
