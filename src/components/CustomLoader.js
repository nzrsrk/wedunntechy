import React from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';

import Theme from '../styles/Theme';

import Spinner from 'react-native-loading-spinner-overlay';


export { LoaderOne, LoaderTwo }



const LoaderOne = (props) => {
    const { style, loader } = props;
    return (
        <Spinner
            visible={loader}
            // textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            cancelable={true}
            color={Theme.BLUE}
            size={'large'}
        />
    )
}



const LoaderTwo = (props) => {

    const { style } = props;

    return (
        <ActivityIndicator size="small" color={Theme.PRIMARY_COLOR} style={{ ...style }} />
    )
}






const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: Theme.SCREEN_WIDTH,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#0000001f',
        minHeight: Theme.SCREEN_HEIGHT
    },
    spinnerTextStyle: {
        color: '#2D96F8'
    },

})