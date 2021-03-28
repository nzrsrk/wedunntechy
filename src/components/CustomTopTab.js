import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Theme from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

export default function CustomTopTab({ state, descriptors, navigation }) {

    return (
        <View style={[styles.tabWrapper]}>
            <View style={[styles.tabConatinerStyle]}>
                {state.routes.map((route, index) => {


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

                            <Text style={[styles.textStyle, isFocused && styles.focusedColor]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );

                })}
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    tabWrapper: {
        backgroundColor: Theme.WHITE,
        padding: heightPercentageToDP(.1),
        ...GlobalStyles.commonPaddingH,
        paddingTop: heightPercentageToDP(2),
        paddingBottom: heightPercentageToDP(.5)
    },
    tabConatinerStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Theme.GRAY_OPACITY,
        alignSelf: 'center',
        justifyContent: 'space-around',
        marginHorizontal: widthPercentageToDP(.5),
        width: '100%',

    },
    tabInner: {
        paddingHorizontal: widthPercentageToDP(.5),
        paddingVertical: heightPercentageToDP(1),
        alignItems: 'center',
        width: Theme.SCREEN_WIDTH / 3,
    },

    textStyle: {
        fontFamily: 'Roboto-Medium',
        color: '#374045',
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    focusedColor: {
        color: Theme.BLUE,
    },
})
