import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "./commons/CustomText";

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
                    <CustomText>
                        {front
                            ? card.question
                            : card.answer
                        }

                    </CustomText>
                    {front
                        ? <CustomText tiny style={{color: 'green'}}>Show Answer</CustomText>
                        : <CustomText tiny style={{color: 'red'}}>Show Question</CustomText>
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
    }
});

