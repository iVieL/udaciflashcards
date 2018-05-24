import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';


export default class DeckSummary extends Component {

    render() {
        const { item } = this.props

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
}

const styles = StyleSheet.create({
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
