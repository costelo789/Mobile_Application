/**
 * Displaying history of fire cases detected by the system
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux'
import { getAllHistoryData } from '../modules/actions'
import { useState, useEffect } from 'react'
function HistoryDetail(props) {
  const { history, getAllHistoryData } = props

  //``` load data from the API using functionc in Redux
  useEffect(() => {
    getAllHistoryData()
  }, [])

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ maxWidth: 50, borderWidth: 1, justifyContent: 'center' }}>Alarm</DataTable.Title>
          <DataTable.Title style={{ maxWidth: 100, borderWidth: 1, justifyContent: 'center' }}>Location Type</DataTable.Title>
          <DataTable.Title style={{ maxWidth: 100, borderWidth: 1, justifyContent: 'center' }}>
            Device
          </DataTable.Title>
          <DataTable.Title style={{ maxWidth: 100, borderWidth: 1, justifyContent: 'center' }}>
            Date
          </DataTable.Title>
          <DataTable.Title style={{ maxWidth: 50, borderWidth: 1, justifyContent: 'center' }}>
            Type
          </DataTable.Title>
        </DataTable.Header>
        {history.map(data => {
          return (
            <DataTable.Row >
              <DataTable.Cell style={{ maxWidth: 50, borderWidth: 1, justifyContent: 'center' }}>{data.alarm_status}</DataTable.Cell>
              <DataTable.Cell style={{ maxWidth: 100, borderWidth: 1, justifyContent: 'center' }}>{data.loc_name}</DataTable.Cell>
              <DataTable.Cell style={{ maxWidth: 100, borderWidth: 1, justifyContent: 'center' }}>{data.device_name}</DataTable.Cell>
              <DataTable.Cell style={{ maxWidth: 100, borderWidth: 1, justifyContent: 'center' }}>{data.date_reading}</DataTable.Cell>
              <DataTable.Cell style={{ maxWidth: 50, borderWidth: 1, justifyContent: 'center' }}>{data.alarm_type}</DataTable.Cell>
            </DataTable.Row>
          )
        })}


      </DataTable>
    </View>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});


const mapStateToProps = ({ historyData }) => {
  return {
    history: historyData.historyDatas
  }
}

const mapDispatchToProps = {
  getAllHistoryData,
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail)