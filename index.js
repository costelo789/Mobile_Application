/**
 * Declaring a provider to wrap the application to establish connection to Redux store for components  
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */
import React from 'react';
import { AppRegistry, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from "react-redux"
import createReducerStore from './src/store';
import bgMessaging from './src/notification/bgMessaging';

const store = createReducerStore()
const fireDetectionApp = () => {
  return (
    <Provider store={store}>

      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <App />
      </View>

    </Provider>)
};

AppRegistry.registerComponent(appName, () => fireDetectionApp);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);

