import React from 'react';
import PushNotificationAndroid from 'react-native-push-notification';

PushNotificationAndroid.createChannel(
  {
    channelId: 'localNotification1', // (required)
    channelName: 'Local Notifications', // (required)
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export const localNotification = (title: String, body: String) => {
  console.log('yes');
  PushNotificationAndroid.localNotification({
    channelId: 'localNotification1',
    title: 'My Notification Title',
    message: 'My Notification Message', // (required)
  });
};
