/**
 * Displaying description of the application and the project description
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import React from 'react';
import { View } from 'react-native';
import { Text, StyleSheet } from "react-native";

var styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 200
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1
    },
    boldText: {
        fontWeight: 'bold'
    },
    normalText: {
    }
});

function AboutUsDetail() {
    return (
        <View>
            < Text h1 style={{ textAlign: "center" }}>iFASTATHANU</Text>
            <Text>Belonging to a larger suite, iFASTATHANU application delivers:{"\n"}</Text>
            <View >
                <Text>{'\t \u2022 \t'}A live feed of the devices's metric {"\n"}</Text>
                <Text>{'\t \u2022 \t'}A history panel about the previous alarms{"\n"}</Text>
            </View>
            <Text>This project is a collaboration of Phat Tran and Hung Vu in term of completing University thesis program.</Text>
        </View>
    )
}

export default AboutUsDetail;