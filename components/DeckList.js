import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {getDecks} from "../utils/DataHandler";
import DeckSummary from "./DeckSummary";
import { connect } from 'react-redux'
import { receiveDecks } from "../_actions";

class DeckList extends Component {

    componentDidMount() {
        getDecks()
            .then((decks) => {
                    this.props.dispatch(receiveDecks(decks))
            })
    }

    render() {
        const { decks } = this.props

        if (decks === null || !decks) {
            return (
                <View>
                    <Text>No Decks found!</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={ Object.values(decks) }
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={ () =>
                            this.props.navigation.push('SingleDeck', {
                                title: item.title
                            })
                        }>

                        <DeckSummary
                            item={item}
                            style={styles.listItem}
                        />
                        </TouchableOpacity>
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

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(DeckList)