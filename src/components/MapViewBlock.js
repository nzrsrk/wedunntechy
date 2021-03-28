import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Theme from '../styles/Theme';
import { Icon, icoMoonConfigSet } from '../styles/Icons';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';


import ContentLoader, {
    FacebookLoader,
    InstagramLoader,
    Bullets
} from "react-native-easy-content-loader";
import moment from 'moment';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FetchCalling } from '../routes/APICalls';




export const MapViewBlock = ({ data }) => {


    // console.log(data);
    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: parseFloat(data.Latitude),
                    longitude: parseFloat(data.Longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                zoomEnabled={true}
                style={styles.mapStyle}
            >
                <Marker coordinate={{ latitude: parseFloat(data.Latitude), longitude: parseFloat(data.Longitude) }} />
            </MapView>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        // height: 200,
        // width: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    mapStyle: {
        flex: 1,
        width: Theme.SCREEN_WIDTH,
        height: Theme.SCREEN_HEIGHT / 2,
        marginTop: 30,
        // ...StyleSheet.absoluteFillObject,
    },

})