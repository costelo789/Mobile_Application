/**
 * Definding methods for receive notification and configuring notification service  
 * @version 1.0.0
 * @author [Phat Tran Hong Dai](https://github.com/sapegin)
 * Vietnamese-German University
 * Year:2020
 */
import React from 'react'
import { View, StyleSheet, Button, Alert } from "react-native";
import { useAsyncStorage, AsyncStorage } from '@react-native-community/async-storage'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { getNotificationData, sendFeedBack } from './modules/actions'
import { useState, useEffect } from 'react'
function FirebaseCloudMessaging(props) {
  const { notifications, getNotificationData, sendFeedBack } = props
  const { getItem: getFcmToken, setItem: saveFcmToken } = useAsyncStorage('fcmToken')

  const [fcmToken, setFcmToken] = React.useState(null)

  //``` Get token from FCM and store it in a storage
  async function getToken() {
    const token = await getFcmToken()

    if (!token) {
      // Get the device token
      firebase.messaging()
        .getToken()
        .then(token => {
          setFcmToken(token)
          saveFcmToken(token)
        })
    }
  }

  //``` check the permissions
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) { }
  }

  async function checkNotificationPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken() // call function to get firebase token for personalized notifications.
    } else {
      requestPermission();
    }
  }

  async function requestUserPermission() {
    const authStatus = await firebase.messaging().requestPermission()
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log('Authorization status:', authStatus)
    }
  }
  //``` Creating channel 
  useEffect(() => {
    const channel = new firebase.notifications.Android.Channel(
      'cos',
      'os',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); 
    // Listen to whether the token changes
    return firebase.messaging().onTokenRefresh(token => {
      saveFcmToken(token)
    })
  }, [])

  useEffect(() => {
    //``` Subscribe to a toppic 
    firebase.messaging().subscribeToTopic('fireDetection').catch((error) => { alert(error) });

    //``` Receive notification when app in foreground
    firebase.notifications().onNotification((notifications) => {
      // Build notification and add modification
      const notification = new firebase.notifications.Notification()
        .setNotificationId(notifications.notificationId)
        .setTitle(notifications.title)
        .setBody(notifications.body)
        .setData(notifications.data)
        .android.setChannelId('cos')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      const action_True = new firebase.notifications.Android.Action('True', 'ic_launcher', 'True_Action');
      const action_False = new firebase.notifications.Android.Action('False', 'ic_launcher', 'False_Action');
      // Add the action to the notification
      notification.android.addAction(action_True);
      notification.android.addAction(action_False);

      //``` Display notification on the device screen    
      firebase.notifications().displayNotification(notification)
    });
  }, [])

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    //``` Receive notification when app in background
    firebase.notifications().onNotificationOpened(remoteMessage => {
      if (remoteMessage.action == "True") {
        const sensorData = {
          temperature: parseInt(remoteMessage.notification.data.temperature),
          smoke: parseInt(remoteMessage.notification.data.smoke),
          status: "True"
        };
        console.log(sensorData)
        sendFeedBack(sensorData)
        firebase.notifications().removeAllDeliveredNotifications()
      }
      else if (remoteMessage.action == "False") {
        const sensorData = {
          temperature: parseInt(remoteMessage.notification.data.temperature),
          smoke: parseInt(remoteMessage.notification.data.smoke),
          status: "False"
        };
        console.log(sensorData)
        sendFeedBack(sensorData)
        firebase.notifications().removeAllDeliveredNotifications()
      }
      else {
        //``` Custom alert message when app in background
        Alert.alert(
          'Alert Title Background',
          'There is a fire. Is that correct?',
          [
            {
              text: 'False Alarm',
              onPress: () => {
                const sensorData = {
                  temperature: parseInt(remoteMessage.notification.data.temperature),
                  smoke: parseInt(remoteMessage.notification.data.smoke),
                  status: "False"
                };
                sendFeedBack(sensorData)
                console.log(sensorData)
                firebase.notifications().removeAllDeliveredNotifications()
              },
              style: 'cancel'
            },
            {
              text: 'Confirm', onPress: () => {
                const sensorData = {
                  temperature: parseInt(remoteMessage.notification.data.temperature),
                  smoke: parseInt(remoteMessage.notification.data.smoke),
                  status: "True"
                };
                sendFeedBack(sensorData)

                //setSensors(sensorData)
                console.log(sensorData)
                firebase.notifications().removeAllDeliveredNotifications()
              }
            }
          ],
          { cancelable: false }
        );
        console.log('Notification caused app to open from background state:',
        )
      }
      //navigation.navigate(remoteMessage.data.type)
    })

    //``` Receive notifications when app is forced to stop or not running
    firebase.notifications()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(remoteMessage.notification.data.temperature)
        console.log(remoteMessage.notification.data.smoke)
        //``` Custom alert message when app receive notifications in stop state 
        Alert.alert(
          'Alert Title Stop State',
          'There is a fire. Is that correct?',
          [
            {
              text: 'False Alarm',
              onPress: () => {
                const sensorData = {
                  temperature: parseInt(remoteMessage.notification.data.temperature),
                  smoke: parseInt(remoteMessage.notification.data.smoke),
                  status: "False"
                };
                sendFeedBack(sensorData)
                firebase.notifications().removeAllDeliveredNotifications()
                console.log(sensorData, "Stop State")
              },
              style: 'cancel'
            },
            {
              text: 'Confirm', onPress: () => {
                const sensorData = {
                  temperature: parseInt(remoteMessage.notification.data.temperature),
                  smoke: parseInt(remoteMessage.notification.data.smoke),
                  status: "True"
                };
                sendFeedBack(sensorData)
                firebase.notifications().removeAllDeliveredNotifications()
                //setSensors(sensorData)
                console.log(sensorData, "Stop State")
              }
            }
          ],
          { cancelable: false }
        );
        firebase.notifications().removeAllDeliveredNotifications();
        firebase.notifications().cancelAllNotifications();
      })
  }, [])
  //``` Return empty to not affect the application render
  return (<View></View>)
}

//``` Connect to Redux store and retrive the state
const mapStateToProps = ({ notification }) => {
  return {
    notifications: notification.notificationData
  }
}

//``` Connect to Redux store and retrive the function which handle the desired API call
const mapDispatchToProps = {
  getNotificationData,
  sendFeedBack,
}
export default connect(mapStateToProps, mapDispatchToProps)(FirebaseCloudMessaging)
