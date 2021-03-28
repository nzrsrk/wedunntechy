import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { OrderView } from '../../components/OrderView';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';


import {
    useFocusEffect,
} from '@react-navigation/native';

import ContentLoader, {
} from "react-native-easy-content-loader";
import moment from 'moment';

import { FetchCalling } from '../../routes/APICalls';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { normalize } from '../../components/Normalize'


function Accepted({ navigation }) {


    const [acceptData, setAcceptData] = useState([]);
    const [acceptLoader, setAcceptLoader] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const collectAllOrder = async () => {
                let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                let passData = {
                    SPUserId: details?.Id,
                    PageIndex: 0,
                    PageSize: 0,
                    Steps: '2'
                }
                let pageFinder = 'getAllServiceRequestBYId';
                setAcceptLoader(true);
                await FetchCalling(passData, setAcceptData, setAcceptLoader, pageFinder)
            }
            collectAllOrder();

            return () => {
                setAcceptLoader(true);
            }


        }, [])
    );



    // useEffect(() => {
    //     if (acceptLoader == false) {
    //         console.log(acceptData)
    //     }
    // }, [acceptLoader])





    return (
        <ScrollView style={styles.container}>

            { acceptLoader == false ?

                (
                    acceptData?.Data?.length > 0 ?
                        acceptData?.Data?.map((item, index) => {
                            return (
                                <View key={index}>
                                    <OrderView
                                        data={item}
                                        headerstyle={styles.titleContainer}
                                        containerStyle={styles.itemsContainer}
                                        footer={
                                            <TouchableOpacity
                                                style={styles.footer}
                                                onPress={() => navigation.navigate('OrderDetails',
                                                    { order_details: item, screen: 'Accepted' })}
                                            >
                                                <Text style={styles.footeText}>View Details</Text>
                                            </TouchableOpacity>
                                        } />
                                </View>
                            )
                        })
                        :

                        <View style={[GlobalStyles.commonPadding, GlobalStyles.alignCenter, { marginTop: heightPercentageToDP(5) }]}>

                            <Icon
                                name={'services'}
                                color={Theme.GREEN}
                                size={normalize(100)}
                                config={icoMoonConfigSet}
                            />
                            <Text>No Service Available</Text>
                        </View>

                )


                :
                <View style={{ paddingHorizontal: heightPercentageToDP(2), paddingVertical: heightPercentageToDP(2) }}>
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(10), "75%", widthPercentageToDP(200)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(20), "25%", "80%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(10), "75%", widthPercentageToDP(200)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(20), "25%", "80%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                </View>

            }


        </ScrollView>
    )
}

export default Accepted;