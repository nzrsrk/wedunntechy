
import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';



import { Icon, icoMoonConfigSet } from '../styles/Icons';
import Theme from '../styles/Theme';
import { AuthContext } from '../routes/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { normalize } from '../components/Normalize';


import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export default function CustomDrawerContent(props) {

  const { signOut } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userinfoLoader, setUserInfoLoader] = useState(true);

  useEffect(() => {

    retrieveData();

    const getFunction = async () => {
      try {
        let value = await AsyncStorage.getItem('userinfo');
        if (value) {
          setUserInfo(JSON.parse(value));
        }
      } catch (e) {
        showMessage({
          message: e,
          type: "default",
          floating: true,
          position: 'bottom',
          icon: 'info',
          backgroundColor: "orange",
          color: '#fff',
        });
      }
    }
    getFunction();

    return () => {
      setActiveItem('')
      setUserInfo(null)
      setUserInfoLoader(true)
    }
  }, []);


  const retrieveData = async () => {

    try {
      const value = await AsyncStorage.getItem('ActiveScreen');
      if (value !== null) {
        setActiveItem(value);
      }
    } catch (error) {
    }

  }


  const stackArray = [
    {
      label: ' Home ',
      icon: 'home',
      stack: 'HomestackNav',
    },
    {
      label: ' Profile ',
      icon: 'user',
      stack: 'Profile',
    },
    {
      label: ' Orders ',
      icon: 'orders',
      stack: 'MyOrderStackNav',
    },
    {
      label: ' My Time Slots ',
      icon: 'hours',
      stack: 'timeSlotsStackNav',
    },
    {
      label: ' Payments ',
      icon: 'wallet_menu',
      stack: 'WedunnHoursStackNav',
    },
    {
      label: ' Notification ',
      icon: 'notification_1',
      stack: 'Notification',
    },
    // {
    //   label: ' Subscription ',
    //   icon: 'subsribtion',
    //   stack: 'Subscription',
    // },
    {
      label: ' Terms and Conditions ',
      icon: 'orders_1',
      stack: 'TermsAndConditions',
      screen: 'TermsAndCondition',
      params: 'yes'
    },
    {
      label: ' Privacy Policy ',
      icon: 'paper_card',
      stack: 'PrivacyPolicy',
      screen: 'PrivacyPolicy',
      params: 'yes'
    },
    {
      label: ' Payment Policy ',
      icon: 'wallet_menu',
      stack: 'PaymentPolicy',
    },
    {
      label: ' Logout ',
      icon: 'logout',
      function: 'signOut',
    },
  ]

  return (
    <DrawerContentScrollView {...props}>

      <TouchableOpacity
        style={[styles.profileWrap]}
        onPress={() => props.navigation.navigate('Profile', {
          screen: 'Profile'
        })}
      >
        <Image
          style={styles.image}
          source={userInfo?.Image ? { uri: userInfo?.Image } : require('../assets/images/others/FakeDP.png')}
        />
        <Text style={styles.text1}>{userInfo?.FirstName}</Text>
        <Text style={[styles.text2]}>{userInfo?.Email}</Text>
        <Text style={[styles.text2]}>{userInfo?.Mobile}</Text>
      </TouchableOpacity>


      <View style={[styles.drawerWrapper]}>
        {
          stackArray.map((item, index) => {
            return (
              <DrawerItem
                icon={({ focused, color, size }) => (
                  <Icon
                    name={item.icon}
                    size={normalize(20)}
                    config={icoMoonConfigSet}
                    style={[styles.drawerIcon, { color: Theme.PRIMARY_COLOR }]}
                  />
                )}
                label={({ focused, color }) =>
                  <Text style={[styles.drawerLabel, { color: '#374045' }]}>{item.label}</Text>
                }
                onPress={() =>

                  item.stack ? (
                    props.navigation.navigate(item.stack,
                      item.screen && {
                        screen: item.screen,
                        params: {
                          statusBarIdenti: item.params ? item.params : ''
                        }
                      }
                    )
                  )
                    :
                    item.function ? signOut() : null
                }

                style={[styles.drawerItem, {}]}
                focused={activeItem == item.stack ? true : false}
                key={index}
              />
            )
          })
        }
      </View>
    </DrawerContentScrollView>
  );
}



const styles = StyleSheet.create({
  drawerIcon: {
    color: '#374045'
  },
  drawerItem: {
    padding: widthPercentageToDP(.5),
    borderBottomWidth: .5,
    borderColor: '#BDDC83',
    backgroundColor: '#fff'
  },
  drawerLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: Theme.FONT_SIZE_MEDIUM,
    color: '#374045',
    left: widthPercentageToDP(-2)
  },
  drawerWrapper: {
    // backgroundColor: 'red'
  },
  profileWrap: {
    minHeight: Theme.SCREEN_HEIGHT / 4.3,
    backgroundColor: '#F5F5F5',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: heightPercentageToDP(8.5),
    width: heightPercentageToDP(8.5),
    borderRadius: heightPercentageToDP(4.25),
    borderWidth: 2,
    borderColor: Theme.GREEN,
    resizeMode: 'cover',
  },
  text1: {
    fontFamily: "Roboto-Bold",
    fontSize: Theme.FONT_SIZE_20,
    color: "#2D98F9",
    marginBottom: heightPercentageToDP(.5)
  },
  text2: {
    fontFamily: "Roboto-Regular",
    fontSize: Theme.FONT_SIZE_SMALL,
    color: "#374045",
  },
});