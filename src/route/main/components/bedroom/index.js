/**
 * Combining components 
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */
import React from 'react';
import BedRoomDetail from "./BedRoom"
import PercentageChart from './PercentageChart';
import { View, Text, StyleSheet, ProgressBarAndroid, TouchableOpacity } from 'react-native';
import { getPercentageBedRoomData } from '../../modules/actions'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

function BedRoom(props) {
  const { percentageBedRoom, getPercentageBedRoomData } = props

  //``` load data from the API call in Redux
  useEffect(() => {
    const interval = setInterval(() => {
      getPercentageBedRoomData()
    }, 20000);
    return () => clearInterval(interval);
  }, [])

  const handleClick = () => {
    getPercentageBedRoomData()
  }
  console.log(percentageBedRoom)
  return (
    <View style={{ alignItems: "center", flexDirection: "column" }}>
      <PercentageChart percentage={percentageBedRoom} />
      <Text h1 style={{ fontSize: 22, fontStyle: "bold" }}>{"\n"}Device Name</Text>
      <BedRoomDetail />


      <View style={{ paddingTop: "2%", width: 200 }}>
        <TouchableOpacity style={{ height: 50, backgroundColor: "skyblue", alignItems: 'center', justifyContent: 'center' }} onPress={handleClick}>
          <Text style={{ fontSize: 32, }}>REFRESH</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

//``` Connect to Redux store and retrive the state
const mapStateToProps = ({ mainData }) => {
  return {
    percentageBedRoom: mainData.percentageBedRoomData
  }
}

//``` Connect to Redux store and retrive the function which handle the desired API call
const mapDispatchToProps = {
  getPercentageBedRoomData,
}
export default connect(mapStateToProps, mapDispatchToProps)(BedRoom)