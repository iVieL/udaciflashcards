import React, { Component } from 'react'
import {StyleSheet, Text} from "react-native";


export default class CustomText extends Component {
    render() {
        const { children, style = {}, tiny, mid, title, big } = this.props;

        const newStyle = getTextSize(tiny, mid, title, big);
        return (
            <Text style={[newStyle, style]}>
                {children}
            </Text>
        );
    }
}

const getTextSize = (tiny, mid, title, big) => {
    if(tiny) return styles.tinyText;
    else if(mid) return styles.midSizeText;
    else if(title) return styles.titleText;
    else if(big) return styles.bigText;
    else return styles.defaultText;
};


const styles = StyleSheet.create({
    defaultText: {
        fontSize: 18,
        textAlign: 'center'
    },
    tinyText: {
        fontSize: 16,
        textAlign: 'center'
    },
    midSizeText: {
        fontSize: 21,
        textAlign: 'center'
    },
    titleText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    bigText: {
        fontSize: 25,
        textAlign: 'center',
    }
});
