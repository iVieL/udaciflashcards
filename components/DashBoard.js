import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import  * as dataHandler from '../utils/DataHandler'
import {purple, white} from "../utils/colors";
import CustomText from "./commons/CustomText";

class DashBoard extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Dash Board',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'orange',
        },
    });

    render() {
        const { navigation } = this.props

        if(!!navigation) {
            return (
                <View style={styles.container}>
                    <CustomText title>Comming soon</CustomText>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <CustomText>Loading</CustomText>
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
export default connect(mapStateToProps)(DashBoard)