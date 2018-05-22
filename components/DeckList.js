import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {getDecks} from "../utils/DataHandler";
import Deck from './Deck'

export default class DeckList extends Component {
    state = {
        decks: null
    }

    componentDidMount() {
        getDecks()
            .then((json) => {
                this.setState(() => ({
                    decks: json
                }))
            }).done()
    }

    render() {
        const {decks} = this.state

        if (decks === null) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }

        console.log('Decks length: ', Object.keys(decks).length);

        return (
            <View style={styles.container}>
                <FlatList
                    data={ Object.values(decks) }
                    renderItem={({item}) =>
                        <Deck
                            item={item}
                            style={styles.listItem}
                            listView
                        />
                    }
                    keyExtractor={(item)=>item.title}
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
    },
});
