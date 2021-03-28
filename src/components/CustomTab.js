import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Icon, icoMoonConfigSet } from '../styles/Icons';

import Theme from '../styles/Theme';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { normalize } from './Normalize'

export default function CustomTab({ state, descriptors, navigation }) {

  return (
    <View style={[styles.tabWrapper]}>
      {state.routes.map((route, index) => {

        if (index <= 3) {

          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabInner]}
            >

              <Icon
                name={options.iconName}
                color='#747474'
                size={normalize(20)}
                config={icoMoonConfigSet}
                style={[styles.iconStyle, isFocused ? styles.focusedColor : styles.nonfocusedColor]}
              />
              <Text style={[styles.textStyle, isFocused ? styles.focusedColor : styles.nonfocusedColor]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        } else {
          return (
            null
          )
        }
      })}
    </View>
  );
}



const styles = StyleSheet.create({
  tabWrapper: {
    backgroundColor: Theme.WHITE,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: heightPercentageToDP(1.2),
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    flexDirection: 'row',
    height: Theme.SCREEN_HEIGHT / 14,
    minHeight: heightPercentageToDP(6.0),
  },
  tabInner: {
    paddingHorizontal: widthPercentageToDP(.5),
    paddingVertical: heightPercentageToDP(.9),
    alignItems: 'center',
    width: Theme.SCREEN_WIDTH / 4
  },
  iconStyle: {
    color: Theme.GREY,
    marginBottom: 2
  },
  textStyle: {
    fontFamily: 'Roboto-Light',
    color: '#747474',
    fontSize: Theme.FONT_SIZE_SMALL
  },
  focusedColor: {
    color: Theme.BLUE,
  },
  nonfocusedColor: {
    color: 'grey',
  },
})
