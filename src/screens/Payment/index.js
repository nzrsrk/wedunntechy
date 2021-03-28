import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';

import styles from './styles';
import Theme from '../../styles/Theme';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { OrderView } from '../../components/OrderView';

import {
    useFocusEffect,
} from '@react-navigation/native';

import { FetchCalling } from '../../routes/APICalls';

import ContentLoader, {
    FacebookLoader,
    InstagramLoader,
    Bullets
} from "react-native-easy-content-loader";


import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


function Payment({ navigation }) {


    const [hoursLoader, setHoursLoader] = useState(true);
    const [hoursData, setHoursData] = useState([]);

    const [complaintLoader, setComplaintLoader] = useState(true);
    const [complaintData, setComplaintData] = useState([]);

    const [userDetail, setUserDetail] = useState([]);


    useFocusEffect(
        React.useCallback(() => {

            const detailsCollection = async () => {
                setHoursLoader(true);
                let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                setUserDetail(details);

                let passData = {
                    Id: details?.Id
                }
                let pageFinder = 'GetDoneHoursByServiceId';
                await FetchCalling(passData, setHoursData, setHoursLoader, pageFinder);
            }


            const complaintsCollection = async () => {
                setComplaintLoader(true);
                let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                let passData = {
                    AssignedSPId: details?.Id,
                    PageIndex: 0,
                    PageSize: 0
                }
                let pageFinder = 'GetAllAssignedComplaintsBySPId';
                await FetchCalling(passData, setComplaintData, setComplaintLoader, pageFinder);
            }

            detailsCollection();
            complaintsCollection();


            return () => {
                setHoursLoader(true);
                setComplaintLoader(true);
            }

        }, [])
    );



    // useEffect(() => {
    //     if (complaintLoader == false) {
    //         console.log(complaintData);
    //     }
    // }, [complaintLoader])





    return (
        <ScrollView style={styles.container}>

            <Text
                style={[
                    GlobalStyles.TextMediumBold,
                    GlobalStyles.commonPaddingV,
                    GlobalStyles.commonPaddingH,
                    { color: Theme.BLUE }
                ]}
            >
                Payments
            </Text>


            {
                hoursLoader ?

                    <View style={{ padding: heightPercentageToDP(2) }}>
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    </View>
                    :
                    <TotalEarn data={hoursData} userDetails={userDetail} />
            }


            {
                complaintLoader ?

                    <View style={{ padding: heightPercentageToDP(2) }}>
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                    </View>
                    :

                    complaintData.Data.map((item, index) => {
                        return (
                            <SinglePayment key={index} item={item} />
                        )
                    })
            }

        </ScrollView>
    )
}

export default Payment;






const TotalEarn = ({ data, userDetails }) => {
    return (
        <View style={[GlobalStyles.commonPaddingV, GlobalStyles.commonPaddingH,]} >
            <View style={[styles.containerEarnings,]} >
                <SingleEarn name="Total  Earnings" value={data.Data.TotalHours} />
                <SingleEarn name="Yearly  Earnings" value={data.Data.YearlyHours} />
                <SingleEarn name="Monthly  Earnings" value={data.Data.MonthlyHours} />
                <SingleEarn name="Weekly  Earnings" value={data.Data.WeeklyHours} style={{ borderBottomWidth: 0 }} />
            </View >
        </View >
    )
}


const SingleEarn = ({ name, value, style }) => {
    return (
        <View style={[styles.earningsRow,
        { borderBottomWidth: 1, borderColor: Theme.GRAY_OPACITY }, { ...style }]}
        >
            <Text style={styles.earningsText}>{name}</Text>
            <Text style={styles.rsText}>{'\u20B9' + ' '}</Text>
            <Text style={styles.amountText}>{value}</Text>
        </View>
    )
}




const SinglePayment = ({ item }) => {
    return (
        <OrderView
            data={item}
            headerstyle={styles.titleContainer}
            containerStyle={styles.contentContainer}
            footer={
                <View style={styles.footer}>
                    <Text style={styles.footeText}>
                        We Dunn Hours : {item.AssignServiceTime}
                    </Text>
                    <Text style={styles.footeText}>
                        Service Cost : {item.ServiceToTCost}
                    </Text>
                </View>
            } />

    )
}