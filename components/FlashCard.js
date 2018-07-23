import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class FlashCard extends Component {

    state = {
        front: true
    };

    flipCard = () => {
        const { front } = this.state;
        this.setState(() =>({
            front: !front
        }))
    };

    render() {
        const { card } = this.props;
        const { front } = this.state;

        return (
            <View style={styles.flashCard}>
                <TouchableOpacity onPress={this.flipCard}>
                    <Text style={styles.flashCardText}>
                        {front
                            ? <Text>{card.question}</Text>
                            : <Text>{card.answer}</Text>
                        }
                    </Text>
                    {front
                        ? <Text style={[styles.flashCardFlipText, {color: 'green'}]}>Answer</Text>
                        : <Text style={[styles.flashCardFlipText, {color: 'red'}]}>Question</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    flashCard: {
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        justifyContent: 'center',
        height: 100,
        alignSelf: 'stretch'
    },
    flashCardText: {
        fontSize: 18
    },
    flashCardFlipText: {
        fontSize: 15,
        justifyContent: 'center',
        paddingTop: 10
    }
});

