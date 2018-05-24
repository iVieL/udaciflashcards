import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getDecks} from "../utils/DataHandler";


function ViewCountQuestionComponent( { cards_count }) {
    return (
        <TouchableOpacity onPress={ () =>
            this.props.navigation.navigate('SingleDeck', {singleView: true, title: item.title})
        }>
            <View>
                <Text style={styles.itemContentText}>
                    View Cards ({cards_count})
                </Text>

            </View>
        </TouchableOpacity>
    )
}

function SingleViewComponent( { data }) {
    console.log('SingleViewComponent', data);
    return (
        <View>
            <Text>{data.title}</Text>
            <Text>{data.questions.length}</Text>
        </View>
    )
}
/*
        <FlatList
            data={ Object.values(decks) }
            renderItem={({item}) =>
                <TouchableOpacity onPress={ () =>
                    this.props.navigation.navigate('SingleDeck', {singleView: true, title: item.title})
                }>

                    <Deck
                        item={item}
                        style={styles.listItem}
                        listView
                    />
                </TouchableOpacity>
            }
            keyExtractor={(item)=>item.title}
        />
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

        console.log('Navigation!! ', navigation);


        if(!!navigation) {
            return (
                <View>
                    <SingleViewComponent data={{
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
