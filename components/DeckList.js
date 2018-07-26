import React, {Component} from 'react'
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {getDecks} from "../utils/DataHandler";
import DeckSummary from "./DeckSummary";
import { connect } from 'react-redux'
import { receiveDecks } from "../_actions";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from "./commons/CustomText";

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
                    <CustomText>No Decks found!</CustomText>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <ActionButton
                    buttonColor='#11c22d'
                    onPress={() => this.props.navigation.push('AddDeck')}
                    renderIcon={() => (<Icon name="md-add" style={styles.actionButtonIcon} />)}
                />
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
    actionButton: {
        backgroundColor: '#11c22d'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(DeckList)