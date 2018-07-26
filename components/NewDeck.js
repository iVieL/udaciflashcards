import React, {Component} from 'react'
import {StyleSheet, TextInput, View} from 'react-native';
import {newDeck} from "../_actions";
import {connect} from "react-redux";
import  * as dataHandler from '../utils/DataHandler'
import {purple, white} from "../utils/colors";
import CustomText from "./commons/CustomText";
import TextButton from "./commons/TextButton";

class NewDeck extends Component {
    state = {
        name: '',
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'New Deck',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center', color: 'white'},
        headerStyle:{
            backgroundColor:'green',
            headerTintColor: 'white'
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
                    <CustomText>What is the title of your new Deck?</CustomText>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.setName}
                        value={name}
                        maxLenght={30}
                    />
                    <TextButton onPress={this.submit} style={styles.submitBtn}>
                        Submit
                    </TextButton>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <CustomText title>Loading</CustomText>
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
    submitBtn: {
        backgroundColor: purple,
        width: 150
    },
});

function mapStateToProps(state) {
    return {

    }

}
export default connect(mapStateToProps)(NewDeck)