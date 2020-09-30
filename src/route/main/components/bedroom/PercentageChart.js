/**
 * Create a dynamic circle to display possibility of fire in the room 
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */


import React from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';


export default function PercentageChart(props) {
    const { percentage } = props
    return (
        <View style={{ alignItems: "center", flexDirection: "column" }}>
            <PercentageCircle radius={120} percent={percentage || 0} color={percentage > 90 ? "red" : percentage < 50 ? "green" : "#fee12b"} borderWidth={6}>
                <Text h1 style={{ fontSize: 30 }}>{percentage || 0}%</Text>
                {percentage > 90 ? (<Text style={{ fontSize: 25, color: "red" }} >Fire</Text>) : percentage < 50 ? (<Text style={{ fontSize: 25, color: "green" }}>Normal</Text>) : (<Text style={{ fontSize: 25, color: "#fee12b" }}>Imminent</Text>)}
            </PercentageCircle>
        </View>
    )
}