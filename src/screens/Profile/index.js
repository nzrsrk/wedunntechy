import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Card, Button, ThemeConsumer } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-elements';
import Theme from '../../styles/Theme';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchCalling } from '../../routes/APICalls';
import { showMessage } from "react-native-flash-message";
import ContentLoader, {
    FacebookLoader,
} from "react-native-easy-content-loader";

import {
    useFocusEffect,
} from '@react-navigation/native';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

function Profile({ navigation }) {


    // set the active screen


    const services = ['Plumbing', 'Electricals']
    const teamstatus = 'wt';

    const [userInfo, setUserInfo] = useState(null);
    const [userinfoLoader, setUserInfoLoader] = useState(true);
    var weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    useFocusEffect(
        React.useCallback(() => {
            const getFunction = async () => {
                try {
                    let value = await AsyncStorage.getItem('userinfo');
                    console.log(JSON.parse(value))
                    if (value) {
                        let details = Boolean(value) && JSON.parse(value);
                        details.timing = []
                        var day = 0
                        for (let i = 0; i < parseInt(details?.BusinessDays); i++) {
                            if (parseInt(details?.BusinessDays) > 6) {
                                day = i
                            }
                            else
                                day = i + 1
                            details?.timing.push(weekday[day])
                        }
                        setUserInfo(details);
                        fetchStateDetails(details?.Id)
                        // setUserInfoLoader(false);
                        // console.log(JSON.parse(value))
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
        }, [userinfoLoader])
    );

    const [StatData, setStatData] = useState();
    const [Loader, setLoader] = useState(true);
    const fetchStateDetails = async (Id) => {
        let passData = {
            SPId: Id
        }
        let pageFinder = 'StatDetails';
        await FetchCalling(passData, setStatData, setLoader, pageFinder);
    }
    useEffect(() => {
        if (Loader === false) {
            if (StatData?.Success) {
                setUserInfoLoader(false);
            }
            else {
                setUserInfoLoader(false);
            }
        }
        return () => {
            setLoader(true)
        }
    }, [Loader]);

    return (
        <ScrollView contentContainerStyle={styles.container} >
            {userinfoLoader ?
                <View>
                    <FacebookLoader pHeight={[heightPercentageToDP(2), heightPercentageToDP(2)]} aSize={normalize(90)} />
                    <ContentLoader pRows={8} pHeight={[heightPercentageToDP(4), heightPercentageToDP(1), heightPercentageToDP(3)]} listSize={1} />
                </View>
                :
                <View style={{ paddingHorizontal: widthPercentageToDP(3), borderColor: Theme.GREEN, borderTopWidth: 3 }}>
                    <Button
                        title="View More >>"
                        type="clear"
                        buttonStyle={styles.moreDetWrapper}
                        titleStyle={styles.moreText}
                        onPress={() => navigation.navigate('ProfileFillView')}
                    />
                    <View style={styles.personalDetailsWrapper}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={userInfo?.Image ? { uri: userInfo?.Image } : require('../../assets/images/others/FakeDP.png')}
                                style={styles.pic}
                            />
                        </View>


                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{userInfo.FirstName} {userInfo.LastName}</Text>
                            {
                                userInfo.Email && <Text style={styles.text}>{userInfo.Email}</Text>
                            }
                            {
                                userInfo.Mobile && <Text style={styles.text}>{userInfo.Mobile}</Text>
                            }
                            {
                                userInfo.Rating &&
                                <TouchableOpacity style={styles.rating}
                                    onPress={() => navigation.navigate('CustomerReview')}>
                                    <Rating
                                        type='custom'
                                        ratingColor={Theme.GREEN}
                                        ratingBackgroundColor='#fff'
                                        selectedColor={Theme.GREEN}
                                        ratingCount={5}
                                        imageSize={normalize(15)}
                                        readonly
                                        startingValue={userInfo.Rating}
                                    />
                                    <Text style={styles.ratingText}>User reviews</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={styles.serviceDetailsWrapper}>
                        <View style={[styles.itemsContainer, { width: '100%' }]}>
                            <Text style={[styles.text2, { marginLeft: widthPercentageToDP(1) }, GlobalStyles.TextMediumBold]}>Offered Services</Text>
                            <View style={[styles.offerContainer]}>
                                {Boolean(userInfo?.OfferService) &&

                                    userInfo?.OfferService?.split(',')?.map((data, index) => {
                                        if (data != '')
                                            return (
                                                <View key={index} style={styles.services}>
                                                    <Text style={[GlobalStyles.TextSmallRegular]}>{data}</Text>
                                                </View>
                                            )
                                    })}

                            </View>
                        </View>


                        {Boolean(userInfo?.timing) && Boolean(userInfo?.BusinessTime) && <View style={[styles.itemsContainer, { marginTop: '5%', width: '100%' }]}>
                            <Text style={[styles.text2, { marginLeft: widthPercentageToDP(1) }, GlobalStyles.TextMediumBold]}>Available Time Slot</Text>
                            <Text style={[styles.text5, { fontFamily: 'Roboto-Bold' }]}> {userInfo?.timing?.toString()} </Text>
                            <Text style={[styles.text5, { fontFamily: 'Roboto-Bold' }]}> {userInfo?.BusinessTime} </Text>
                        </View>}
                        <View style={{ flexDirection: 'row', paddingVertical: heightPercentageToDP(2.5) }} >
                            {Boolean(StatData?.TotalCount) && <View style={{}} >
                                <Text style={[styles.num, { fontSize: normalize(61), }]}>{StatData?.TotalCount}</Text>
                                <Text style={[styles.num, { fontSize: Theme.FONT_SIZE_SMALL },]}>Task Completed</Text>
                            </View>}
                            {Boolean(StatData?.Data?.TotalHours) && <View style={{ paddingHorizontal: heightPercentageToDP(2) }} >
                                <Text style={[styles.num, { fontSize: normalize(61), }]}>{StatData?.Data?.TotalHours?.toFixed(2)}</Text>
                                <Text style={[styles.num, { fontSize: Theme.FONT_SIZE_SMALL },]}>Dunn Hours</Text>
                            </View>}
                        </View>
                    </View>


                    <View style={styles.teamDetailsWrapper}>
                        {/* <Button
                            title="My Team"
                            type='outline'
                            onPress={() => navigation.navigate('MyTeam')}
                            titleStyle={{ ...GlobalStyles.TextMediumBold, color: Theme.DIM_GRAY, }}
                            buttonStyle={[styles.buttonStyle]}
                        /> */}


                        {/* team status ct-create team ,wt-with team */}
                        {/* {
                            teamstatus === 'ct' ?
                                <View style={styles.bottomWrapper2}>

                                    <Text style={[styles.text4, {}]}>Not a team member?</Text>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AddTeam')}
                                    >
                                        <Text style={[styles.text4, { color: Theme.BLUE }]}>create team?</Text>
                                    </TouchableOpacity>

                                </View>
                                :
                                null
                        } */}
                        {/* {
                            teamstatus === 'wt' ?
                                <View style={styles.bottomWrapper2}>
                                    <Text style={[styles.text4, {}]}>David's team (leader)</Text>
                                    <Text style={[styles.text4, {}]}>Member since 01/01/2020</Text>
                                </View>
                                :
                                null
                        } */}
                    </View>

                </View>
            }
        </ScrollView >
    )
}

export default Profile;