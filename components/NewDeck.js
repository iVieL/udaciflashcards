import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {newDeck} from "../_actions";
import {connect} from "react-redux";
import  * as dataHandler from '../utils/DataHandler'
import {purple, white} from "../utils/colors";

class NewDeck extends Component {
    state = {
        name: '',
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'New Deck',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'green',
        },
    });

    setName = (name) => {
        this.setState(() => ({
            name
        }))
    };

    submit = () => {
        const { name } = this.state

        this.props.dispatch(newDeck(name));

        this.setState(() => ({
            name: '',
        }));

        this.back();

        dataHandler.newDeck(name);
    };

    back = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { navigation } = this.props
        const { name } = this.state

        if(!!navigation) {
            return (
                <View style={styles.container}>
                    <Text>What is the title of your new Deck?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.setName}
                        value={name}
                        maxLenght={30}
                    />
                    <TouchableOpacity
                        style={styles.androidSubmitBtn}
                        onPress={this.submit}
                    >
                        <Text style={styles.submitBtnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View>
            )
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
});

function mapStateToProps(state) {
    return {

    }

}
export default connect(mapStateToProps)(NewDeck)