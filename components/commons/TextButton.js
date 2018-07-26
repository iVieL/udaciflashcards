import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import {white} from "../../utils/colors";
import {isIOS} from "../../utils/helpers";

export default function TextButton({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress} style={platformButton()}>
            <Text style={[ styles.buttonText, style ]}>{children}</Text>
        </TouchableOpacity>
    )
}

function platformButton() {
    return isIOS() ? styles.iosButton: styles.androidButton;
}

const styles = StyleSheet.create({
    iosButton: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidButton: {
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
})
