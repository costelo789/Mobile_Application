import firebase from "react-native-firebase";

/**
 * this code is resolved in background, so debugger and logs doesn't work here.
 * It's easier to test code somewhere else in foreground and then paste here.
 */
export default async message => {
  const channel = new firebase.notifications.Android.Channel(
    "general-channel",
    "General Notifications",
    firebase.notifications.Android.Importance.Default
  ).setDescription("General Notifications");
  firebase.notifications().android.createChannel(channel);

  const notification = new firebase.notifications.Notification();
  notification.android
    .setChannelId("general-channel")
    .setNotificationId("message.messageId")
    .setTitle("message.data.title")
    .setBody("message.data.body")
    .android.setPriority(firebase.notifications.Android.Priority.High);

    const acceptAction = new firebase.notifications.Android.Action('accept_action', 'default', 'Accept');
    const rejectAction = new firebase.notifications.Android.Action('reject_action', 'default', 'Reject');
// Add the action to the notification
acceptAction.setShowUserInterface(false);
rejectAction.setShowUserInterface(false);
notification
.android.addAction(acceptAction)
.android.addAction(rejectAction);

  if (message.data.largeIcon) {
    notification.android.setLargeIcon(message.data.largeIcon);
  }
  if (message.data.bigPicture) {
    notification.android.setBigPicture(message.data.bigPicture);
  }
  firebase.notifications().displayNotification(notification);
  firebase.notifications().onNotificationOpened((notificationOpen) => {
    console.log(notificationOpen.action)
    
});
  return Promise.resolve();
};