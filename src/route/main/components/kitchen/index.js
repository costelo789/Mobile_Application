/**
 * Combining components 
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import React from 'react';
import KitchenDetail from "./Kitchen"
import PercentageChart from './PercentageChart';
import { View, Text, StyleSheet, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { getPercentageKitchenData } from '../../modules/actions'
import { useState, useEffect } from 'react'

function Kitchen(props) {
  const { percentageKitchen, getPercentageKitchenData } = props

  //``` load data from the API call in Redux
  useEffect(() => {
    const interval = setInterval(() => {
      getPercentageKitchenData()
    }, 20000);
    return () => clearInterval(interval);
  }, [])

  const handleClick = () => {
    getPercentageKitchenData()
  }
  return (
    <View style={{ alignItems: "center", flexDirection: "column" }}>
      <PercentageChart percentage={percentageKitchen} />
      <Text h1 style={{ fontSize: 22, fontStyle: "bold" }}>{"\n"}Kitchen</Text>
      <KitchenDetail />


      <View style={{ paddingTop: "2%", width: 200 }}>
        <TouchableOpacity style={{ height: 50, backgroundColor: "skyblue", alignItems: 'center', justifyContent: 'center' }} onPress={handleClick} >
          <Text style={{ fontSize: 32, }}>REFRESH</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

//``` Connect to Redux store and retrive the state
const mapStateToProps = ({ mainData }) => {
  return {
    percentageKitchen: mainData.percentageKitchenData
  }
}

//``` Connect to Redux store and retrive the function which handle the desired API call
const mapDispatchToProps = {
  getPercentageKitchenData,
}
export default connect(mapStateToProps, mapDispatchToProps)(Kitchen)