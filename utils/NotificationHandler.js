import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export const NOTIFICATION_KEY = 'UdicyFlashcards:notifications';


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return {
        title: 'Time to practice!',
        body: "👋 The practice makes the master!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then( (data) => {
            console.log('looking for notifications: ', data);
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then( ({ status }) => {
                        console.log('something ', status);
                        if(status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate()+1);
                            tomorrow.setHours(7);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}
