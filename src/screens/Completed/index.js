import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';


import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import { OrderView } from '../../components/OrderView'


import {
    useFocusEffect,
} from '@react-navigation/native';

import ContentLoader, {
} from "react-native-easy-content-loader";

import { FetchCalling } from '../../routes/APICalls';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';



function Accepted({ navigation }) {



    const [acceptData, setAcceptData] = useState([]);
    const [acceptLoader, setAcceptLoader] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const collectAllOrder = async () => {
                let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                let passData = {
                    SPUserId: details.Id,
                    PageIndex: 0,
                    PageSize: 0,
                    Steps: '10,11,12,13'
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


    return (
        <ScrollView style={styles.container}>

            { acceptLoader == false ?

                (
                    acceptData.Data.length > 0 ?

                        acceptData.Data.map((item, index) => {
                            return (
                                <View key={index}>
                                    {
                                        item.Step === '10' || item.Step === '11' || item.Step === '12' || item.Step === '13' ?
                                            <OrderView
                                                data={item}
                                                headerstyle={styles.titleContainer}
                                                containerStyle={styles.itemsContainer}
                                                footer={
                                                    <TouchableOpacity
                                                        style={styles.footer}
                                                        onPress={() => navigation.navigate('OrderDetails',
                                                            { order_details: item, screen: 'OnGoing' })}
                                                    >
                                                        <Text style={styles.footeText}>View Details</Text>
                                                    </TouchableOpacity>
                                                }
                                            />
                                            :
                                            null
                                    }
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
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(10), "75%", widthPercentageToDP(20)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(20), "25%", "80%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(10), "75%", widthPercentageToDP(20)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    <ContentLoader active pRows={5} pWidth={["100%", widthPercentageToDP(20), "25%", "80%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                </View>

            }


        </ScrollView>
    )
}

export default Accepted;