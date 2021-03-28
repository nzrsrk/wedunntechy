import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';


import styles from './styles';
import Theme from '../../styles/Theme';


import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import {
    useFocusEffect,
} from '@react-navigation/native';
import { FetchCalling } from '../../routes/APICalls';
import ContentLoader, {
} from "react-native-easy-content-loader";
import { timeAgo } from './timeAgo';
import { CheckNull } from '../../components/CheckNull';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Notification({ navigation, route }) {
    // const setNotification = async (newdata) => {
    //     // console.log(newdata)
    //     let new_notifications = [...data]
    //     new_notifications.push(newdata)
    //     setData(new_notifications)
    // }
    // useEffect(() => {
    // console.log(route)

    // if (route.params && Object.keys(route.params).length != 0) {
    //     setNotification(route.params)
    // }
    // }, []);

    const [NotificationLoader, setNotificationLoader] = useState(true);
    const [data, setData] = useState([]);
    const [retunData, setRetunData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getFunction();
        }, 5000);
    }, []);

    const getFunction = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('userinfo'));

        let passData = {
            SPID: value.Id,
            PageIndex: 0,
            PageSize: 0
        }
        let pageFinder = "notification";

        if (value.Id != '') {
            FetchCalling(passData, setRetunData, setNotificationLoader, pageFinder);
            setRefreshing(false)
        }

    }
    useFocusEffect(
        React.useCallback(() => {
            getFunction();
        }, [])
    );
    useEffect(() => {
        if (NotificationLoader == false) {
            if (retunData.Success) {
                setData(retunData.Data)
                // console.log(retunData.Data)
            }
        }

    }, [NotificationLoader]);

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl refreshing={refreshing}
                onRefresh={onRefresh}
                // progressBackgroundColor='white'
                colors={[Theme.BLUE, Theme.GREEN,]}
            />
        }>
            {NotificationLoader ?
                <View style={{ paddingHorizontal: heightPercentageToDP(2), paddingVertical: heightPercentageToDP(2) }}>
                    <ContentLoader active containerStyles={{ marginBottom: heightPercentageToDP(2) }} pRows={1} pWidth={["100%", widthPercentageToDP(20), "25%", widthPercentageToDP(4.5)]} />
                    <ContentLoader active containerStyles={{ marginBottom: heightPercentageToDP(2) }} pRows={1} pWidth={["100%", widthPercentageToDP(20), "25%", widthPercentageToDP(4.5)]} />
                    <ContentLoader active containerStyles={{ marginBottom: heightPercentageToDP(2) }} pRows={1} pWidth={["100%", widthPercentageToDP(20), "25%", widthPercentageToDP(4.5)]} />
                </View>
                : <View>
                    {data.length != 0 ?
                        <View>
                            {data.map((data, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.notification_container, { backgroundColor: data.seen ? Theme.WHITE : '#E8E8E8' }]}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <View>
                                            <Text style={styles.title}>{data.ServiceList}</Text>
                                            <Text style={styles.text}>{timeAgo(data.CreateDate)}</Text>
                                            <Text style={styles.text}>{CheckNull(data?.HouseName) + ' '
                                                + CheckNull(data?.Street) + ' '
                                                + CheckNull(data?.District) + ' '
                                                + CheckNull(data?.Pincode)}</Text>
                                        </View>

                                        {/* <Icon
                                            name='dots'
                                            color={Theme.DIM_GRAY}
                                            size={22}
                                            config={icoMoonConfigSet}
                                        /> */}
                                    </TouchableOpacity>
                                )
                            })}
                        </View> :
                        <View style={styles.noContentView}>
                            <Icon
                                name='notification_f'
                                color={'#C6C1C1'}
                                size={normalize(50)}
                                config={icoMoonConfigSet}
                                style={{ marginBottom: heightPercentageToDP(.5) }}
                            />
                            <Text style={styles.noContentStyle}>No new Notifications</Text>
                        </View>}
                </View>}
        </ScrollView>
    )
}

export default Notification;