/**
 * Displaying the fire possibility, temperature and smoke density in each room
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import React from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { useState, useEffect } from 'react'
import BedRoom from "./bedroom/index"
import Kitchen from './kitchen/index';
import LivingRoom from './livingroom/index';

function MainDetail(props) {
  //''' Define options for stwitching between rooms
  const [selectedValue, setSelectedValue] = useState("Bed_Room");
  return(
 <View style={{alignItems:"center",flexDirection:"column"}}>
    <View style={{width:200,maxWidth:"100%"}}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="BedRoom" value="Bed_Room" />
        <Picker.Item label="Kitchen" value="Kitchen" />
        <Picker.Item label="Living Room" value="Living_Room" />
        {console.log(selectedValue)}
      </Picker>
    </View>
   <View>
   {(() => {
        if (selectedValue=="Kitchen") {
          return (
            <Kitchen/>
          )
        } else if (selectedValue=="Bed_Room") {
          return (
            <BedRoom/>
          )
        } else {
          return (
            <LivingRoom/>
          )
        }
      })()}
   </View>
  

</View>
  )
  }
  export default MainDetail