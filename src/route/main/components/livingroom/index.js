/**
 * Combining components
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import React from 'react';
import LivingRoomDetail from "./LivingRoom"
import PercentageChart from './PercentageChart';
import { View, Text, StyleSheet, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { getPercentageLivingRoomData } from '../../modules/actions'
import { useState, useEffect } from 'react'

function LivingRoom(props) {
  const { percentageLivingRoom, getPercentageLivingRoomData } = props

  //``` load data from the API using functionc in Redux
  useEffect(() => {
    const interval = setInterval(() => {
      getPercentageLivingRoomData()
    }, 2000);
    return () => clearInterval(interval);
  }, [])

  const handleClick = () => {
    getPercentageLivingRoomData()
  }
  return (
    <View style={{ alignItems: "center", flexDirection: "column" }}>
      <PercentageChart percentage={percentageLivingRoom} />
      <Text h1 style={{ fontSize: 22, fontStyle: "bold" }}>{"\n"}Living Room</Text>
      <LivingRoomDetail />


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
    percentageLivingRoom: mainData.percentageLivingRoomData
  }
}

//``` Connect to Redux store and retrive the function which handle the desired API call
const mapDispatchToProps = {
  getPercentageLivingRoomData,
}
export default connect(mapStateToProps, mapDispatchToProps)(LivingRoom)