/**
 * Creating a general template UI for mobile the application and navigation service to switch between screens 
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */

import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import AboutUs from "../../route/aboutUs/index";
import History from "../../route/history/index";
import Main from "../../route/main/index";
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainBoard({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Main />
    </View>
  );
}

function MainBoardStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainBoard} options={{
        title: 'Main Board',
        headerStyle: {
          backgroundColor: '#678BFA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
      }} />
    </Stack.Navigator>
  );
}

function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <History />
    </View>
  );
}

function HistoryStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={HistoryScreen} options={{
        title: 'History',
        headerStyle: {
          backgroundColor: '#678BFA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
      }} />
    </Stack.Navigator>
  );
}

function AboutUsScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <AboutUs />
    </View>
  );
}

function AboutUsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={AboutUsScreen} options={{
        title: 'About Us',
        headerStyle: {
          backgroundColor: '#678BFA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
      }} />
    </Stack.Navigator>
  );
}

//``` Assigning componet to a screen and creating the bottom tab navigation
function PublicTemplateRoute(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainBoardStackScreen} />
        <Tab.Screen name="History" component={HistoryStackScreen} />
        <Tab.Screen name="About" component={AboutUsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

export default PublicTemplateRoute;