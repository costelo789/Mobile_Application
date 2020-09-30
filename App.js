/**
 * Defining URLs for calling API in server 
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AboutUsDetail from './src/route/aboutUs/components/AboutUsDetail';
import { NativeRouter, Router, Route, Link, Switch } from "react-router-native";
import { PublicTemplateRoute } from './src/templates';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react'

import FirebaseCloudMessaging from './src/notification/NotificationHook'

export default function App(props) {

  return (
    <View style={{ flex: 1 }}>
      <FirebaseCloudMessaging />
      <PublicTemplateRoute />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
