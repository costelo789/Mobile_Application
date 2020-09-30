/**
 * Displaying current temperature and smoke value in the room
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import React from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid } from 'react-native';
import { connect } from 'react-redux'
import { getKitchenData } from '../../modules/actions'
import { useState, useEffect } from 'react'


function KitchenDetail(props) {
  const { kitchen, getKitchenData } = props
  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();

  //``` load data from the API call in Redux
  useEffect(() => {
    const interval = setInterval(() => {
      getKitchenData()
    }, 2000);
    return () => clearInterval(interval);
  }, [])
  console.log(kitchen)
  // if(mains!=null){
  //   console.warn("Res")

  // }
  // else{
  //   console.warn("No")
  // }

  return (
    <View style={{ borderStyle: "solid", borderRadius: 10, borderWidth: 2, width: "100%", height: 150, maxHeight: 150, maxWidth: "100%", width: 300 }}>

      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Temperature </Text>
          <ProgressBarAndroid
            style={styles.progressBar}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={parseInt(Object.values(kitchen)[1]) / 120 || 0} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Smoke Density </Text>
          <ProgressBarAndroid
            style={styles.progressBar}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={parseInt(Object.values(kitchen)[0]) / 120 || 0} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>Local Time </Text>
          <Text style={{ paddingTop: 5 }}>{hours}:{minutes}</Text>
        </View>

      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%"

  },
  example: {
    marginVertical: 24,
  },
  progressBar: {
    width: 100,
    transform: [{ scaleX: 1.0 }, { scaleY: 2.5 }],
  },
  text: {
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 22,
  }
});

//``` Connect to Redux store and retrive the state
const mapStateToProps = ({ mainData }) => {
  return {
    kitchen: mainData.kitchenData
  }
}

//``` Connect to Redux store and retrive the function which handle the desired API call
const mapDispatchToProps = {
  getKitchenData,
}
export default connect(mapStateToProps, mapDispatchToProps)(KitchenDetail)