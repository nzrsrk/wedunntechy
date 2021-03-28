import React, {Component} from 'react';
import { View,Text,PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from 'react-native-firebase';

import Routes from './src/routes/Routes';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
//import PushController from './src/helper/PushController'
const audioRecorderPlayer = new AudioRecorderPlayer();



export default class App extends Component {

async componentDidMount() {
  this.checkPermission();

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }


}

  //1

  onStartRecord = async () => {
    await audioRecorderPlayer.startRecorder();
  
    };

    onStopRecord = async () => {
      const audio = await audioRecorderPlayer.stopRecorder();
     
      };


async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('4');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          console.log("token",fcmToken)
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

  render() {
    return (
      <Routes />
    );
  }
}
