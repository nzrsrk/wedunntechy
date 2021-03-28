import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Theme from '../../styles/Theme';

import styles from './styles';
import GlobalStyles from '../../styles/GlobalStyles';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';
// import { SwitchToggle } from 'dooboo-ui';
import ToggleSwitch from 'toggle-switch-react-native'


import Typography from '../../styles/Typography';
import { FetchCalling } from '../../routes/APICalls';

import { showMessage } from "react-native-flash-message";

import {
    useFocusEffect,
} from '@react-navigation/native';

import ContentLoader, {
} from "react-native-easy-content-loader";
import moment from 'moment';

import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


function Home({ navigation }) {


    const [isEnabled, setIsEnabled] = useState(true);
    const [Loading, setLoading] = useState(true);

    const toggleSwitch = (selector) => {
        setIsEnabled(previousState => !previousState);
        availabiltySetup(selector);
    }




    const [availability, setAvailability] = useState([]);
    const [availabilityLoader, setAvailabilityLoader] = useState(null);


    const availabiltySetup = async (selector) => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
        setAvailability(true);

        let passData = {
            Id: details.Id,
            Available: !selector ? 1 : 0
        }

        let pageFinder = 'UpdateAvailabilityServicePerson';
        await FetchCalling(passData, setAvailability, setAvailabilityLoader, pageFinder);
    }


    // useEffect(() => {
    //     if (availabilityLoader == false) {
    //         console.log(availability)
    //     }
    // }, [availabilityLoader])

    const [activateLoader, setActivateLoader] = useState();
    const [acrivateData, setacrivateData] = useState();

    useEffect(() => {
        let passData = {
        }
        let pageFinder = 'ServiceActivate';
        FetchCalling(passData, setActivateLoader, setacrivateData, pageFinder);
    }, []);



    const [dataService, setdataService] = useState([]);
    const [dataLoader, setDataLoader] = useState(null);


    const [hoursLoader, setHoursLoader] = useState(true);
    const [hoursData, setHoursData] = useState([]);


    const getAllSeriveRequest = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
        setDataLoader(true);

        let passData = {
            SPID: details?.Id,
            PageIndex: 0,
            PageSize: 0
        }
        let pageFinder = 'notification';
        await FetchCalling(passData, setdataService, setDataLoader, pageFinder);
    }


    const detailsCollection = async () => {
        setHoursLoader(true);
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));

        let passData = {
            Id: details?.Id
        }
        let pageFinder = 'GetDoneHoursByServiceId';
        await FetchCalling(passData, setHoursData, setHoursLoader, pageFinder);
    }


    useFocusEffect(
        React.useCallback(() => {

            getAllSeriveRequest();
            detailsCollection();

            return () => {
                setHoursLoader(true);
                setDataLoader(true);
            }


        }, [])
    );


    useEffect(() => {
        if (hoursLoader == false) {
            // console.log(hoursData)
        }
    }, [hoursLoader])



    useEffect(() => {
        if (dataLoader == false) {
            // console.log(dataService.Data)
        }
    }, [dataLoader])



    const [passUpdater, setPassUpdater] = useState(false);

    useEffect(() => {
        if (passUpdater == true) {
            getAllSeriveRequest();
            setPassUpdater(false);
        }
    }, [passUpdater])



    return (
        <ScrollView contentContainerStyle={{}} style={Typography.container}>

            <Image
                style={styles.image}
                source={require('../../assets/images/others/27.png')}
                resizeMode={'stretch'}
            />


            <View style={[styles.container2,]}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[GlobalStyles.TextSmallRegular, { marginRight: widthPercentageToDP(1) }]}>Availabilty</Text>
                    {/* <View style={styles.SwitchContainer}> */}
                    {/* <SwitchToggle
                            containerStyle={styles.toggleContainer}
                            circleStyle={styles.toggleCircle}
                            backgroundColorOn="#fff"
                            backgroundColorOff="#fff"
                            switchOn={isEnabled}
                            onPress={() => toggleSwitch(isEnabled)}
                            circleColorOff={Theme.BLUE}
                            circleColorOn={Theme.BLUE}
                            duration={500}
                        /> */}
                    <ToggleSwitch
                        isOn={isEnabled}
                        thumbOnStyle={{ backgroundColor: Theme.GREEN }}
                        thumbOffStyle={{ backgroundColor: Theme.BLUE }}
                        size="small"
                        trackOnStyle={{ backgroundColor: '#EEEEEE', }}
                        trackOffStyle={{ backgroundColor: '#EEEEEE' }}
                        onToggle={() => toggleSwitch(isEnabled)}
                    />
                    {/* </View> */}
                </View>


                {
                    hoursLoader ?
                        <ActivityIndicator />
                        :
                        <View style={styles.container3}>
                            <Text style={GlobalStyles.TextSmallRegular}>Daily Earnings  </Text>
                            <Text style={[GlobalStyles.TextSmallRegular, { color: Theme.BLUE, }]}>{'\u20B9' + ' '}</Text>
                            <Text style={[GlobalStyles.TextSmallBold, { color: Theme.GREEN }]}>{hoursData.Data.DailyHours}</Text>
                        </View>
                }

            </View>


            <View style={{ marginBottom: heightPercentageToDP(2) }}>
                {
                    isEnabled ?
                        <View style={[styles.itemContainer,]}>

                            <View style={[styles.borderbottomStyle]}>
                                <Text style={styles.title}>Service Request</Text>
                            </View>

                            {
                                dataLoader == false ?
                                    (
                                        dataService?.Data?.length > 0 ?
                                            dataService?.Data?.map((data, index) => {
                                                return (
                                                    <SingleService key={index} data={data} navigation={navigation} setPassUpdater={setPassUpdater} />
                                                )
                                            })
                                            :
                                            <View style={[GlobalStyles.alignCenter, { textAling: 'center', flex: 1, width: '100%', paddingHorizontal: widthPercentageToDP(3), paddingVertical: heightPercentageToDP(3) }]}>
                                                <Icon
                                                    name={'work'}
                                                    color={Theme.GREEN}
                                                    size={normalize(100)}
                                                    config={icoMoonConfigSet}
                                                />
                                                <Text style={[styles.title2]}>No Service Listed</Text>
                                            </View>
                                    )

                                    :
                                    <View style={{ paddingVertical: heightPercentageToDP(2), paddingHorizontal: heightPercentageToDP(2) }}>
                                        <ContentLoader active avatar pRows={4} pWidth={["100%", widthPercentageToDP(20), "25%", widthPercentageToDP(4.5)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                                        <ContentLoader active avatar pRows={4} pWidth={["100%", widthPercentageToDP(20), "25%", widthPercentageToDP(4.5)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                                        <ContentLoader active avatar pRows={4} pWidth={["100%", widthPercentageToDP(20), "25%", widthPercentageToDP(4.5)]} containerStyles={{ marginBottom: heightPercentageToDP(2) }} />
                                    </View>
                            }



                        </View>
                        :
                        <View style={[GlobalStyles.commonPadding, GlobalStyles.alignCenter, { marginTop: heightPercentageToDP(5) }]}>

                            <Icon
                                name={'work'}
                                color={Theme.GREEN}
                                size={normalize(100)}
                                config={icoMoonConfigSet}
                            />
                            <Text style={{ fontSize: Theme.FONT_SIZE_SMALL }}>You are offline</Text>
                        </View>
                }
            </View>
        </ScrollView>

    )
}



export default Home;








const SingleService = ({ data, navigation, setPassUpdater }) => {
    // accept service request

    // console.log(moment(new Date()).format('dddd, MMMM DD, YYYY, HH:MM:SS A'));



    const [acceptData, setAcceptData] = useState([]);
    const [acceptLoader, setAcceptLoader] = useState();
    const [userDetails, setUserDetails] = useState([]);

    const acceptRequest = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
        setUserDetails(details);
        let passData = {
            ServiceId: details.Id,
            ComplaintId: data.Id,
        }

        // console.log(passData)

        let pageFinder = 'acceptService';
        setAcceptLoader(true);
        await FetchCalling(passData, setAcceptData, setAcceptLoader, pageFinder);
    }


    // console.log(acceptData.Data.StatusList);

    const [stepUpdate, setStepUpdate] = useState([]);
    const [stepUpdateLoader, setStepUpdateLoader] = useState(null);

    useEffect(() => {
        if (acceptLoader === false) {
            console.log(acceptData)
            if (acceptData?.Success) {

                let statuslist = JSON.parse((acceptData.Data.StatusList));
                statuslist.push(
                    {
                        Date: moment(new Date()).format('dddd, MMMM DD, YYYY, hh:mm:ss A'),
                        Status: 'Service Person Accepted'
                    }
                )

                const stepUpdation = async () => {
                    setStepUpdateLoader(true)
                    let passData = {
                        Id: acceptData.Data.Id,
                        Step: 2,
                        StatusList: JSON.stringify(statuslist),
                        LastStatus: 'Service Person Accepted'
                    }
                    let pageFinder = 'stepUpdation';


                    await FetchCalling(passData, setStepUpdate, setStepUpdateLoader, pageFinder);
                }

                stepUpdation();

            } else {
                showMessage({
                    message: 'Something went wrong',
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'info',
                    backgroundColor: "orange",
                    color: '#fff',
                });
            }
        }

    }, [acceptLoader]);




    const [passData, setPassData] = useState([]);
    const [passLoader, setPassLoader] = useState();

    const passRequest = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));

        let passData = {
            ServiceId: details.Id,
            ComplaintId: data.Id,
        }

        // console.log(passData)

        let pageFinder = 'PassNotification';
        setPassLoader(true);
        await FetchCalling(passData, setPassData, setPassLoader, pageFinder);
    }


    useEffect(() => {
        if (passLoader === false) {
            // console.log(passData);
            if (passData.Success) {
                showMessage({
                    message: "Service rejected",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });

                setPassUpdater(true);
            } else {
                showMessage({
                    message: 'Something went wrong',
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'info',
                    backgroundColor: "orange",
                    color: '#fff',
                });
            }
        }

    }, [passLoader]);











    useEffect(() => {
        if (stepUpdateLoader == false) {
            showMessage({
                message: "Service Request Accepted",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'success',
                backgroundColor: "green",
                color: '#fff',
            });
            navigation.navigate('MyOrderStackNav', {
                screen: 'MyOrder'
            });
        }
    }, [stepUpdateLoader])





    return (
        <View >
            <View style={{ paddingVertical: heightPercentageToDP(.5), paddingHorizontal: widthPercentageToDP(.5) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {data.UserImage ?
                        <Image source={data?.UserImage} style={styles.pic} /> :
                        <Icon
                            name={'user_f'}
                            color={Theme.BLUE}
                            size={normalize(14)}
                            config={icoMoonConfigSet}
                        />}
                    <Text style={[{ marginLeft: widthPercentageToDP(1), }, GlobalStyles.TextMediumBold]}>
                        {data.EndUserName ? data.EndUserName : 'Not Available'}
                    </Text>
                </View>

                <Text style={[{ paddingVertical: heightPercentageToDP(1) }, GlobalStyles.TextSmallRegular]}>
                    {data.Description ? data.Description : 'Not available'}
                </Text>

                <View style={[styles.locWrap]}>

                    <Text style={[GlobalStyles.TextSmallRegular]}>Location</Text>
                    <View style={[styles.border, styles.locInner]}>
                        <Icon
                            name={'location'}
                            color={Theme.BLUE}
                            size={normalize(13)}
                            config={icoMoonConfigSet}
                        />
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]} >
                            {data.Street && data.Street + " | "}
                        </Text>
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]} >
                            {data.City && data.City + " | "}
                        </Text>
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]} >
                            {data.District && data.District}
                        </Text>
                    </View>

                    <Text style={[GlobalStyles.TextSmallRegular]}>Booked Time</Text>
                    <View style={[styles.border, styles.locInner]}>
                        <Icon
                            name={'servicesmenu'}
                            color={Theme.BLUE}
                            size={normalize(13)}
                            config={icoMoonConfigSet}
                        />
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]}>
                            {data.CreateDate && moment(data.CreateDate).format('LT') + " | "}
                        </Text>
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]}>
                            {data.CreateDate && moment(data.CreateDate).format('DD.MM.YYYY')}
                        </Text>
                    </View>

                    <Text style={[GlobalStyles.TextSmallRegular]}>Scheduled Time / Date</Text>
                    <View style={[styles.border, styles.locInner]}>
                        <Icon
                            name={'servicesmenu'}
                            color={Theme.BLUE}
                            size={normalize(13)}
                            config={icoMoonConfigSet}
                        />
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]}>
                            {data.AvailableStartTime && data.AvailableStartTime + " - "}
                            {data.AvailableEndTime && data.AvailableEndTime + "  | "}
                        </Text>
                        <Text style={[{ marginLeft: widthPercentageToDP(.5) }, GlobalStyles.TextSmallRegular]}>
                            {data.AvailableDate && data.AvailableDate}
                        </Text>
                    </View>


                </View>

            </View>


            <View style={{ flexDirection: 'row', height: heightPercentageToDP(4), }}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Theme.GREEN }]}
                    onPress={() => acceptRequest()}
                >
                    <Text style={styles.btnText}>Accept</Text>
                    <Icon
                        name={'accept'}
                        color={Theme.WHITE}
                        size={normalize(14)}
                        config={icoMoonConfigSet}
                    />
                    {
                        stepUpdateLoader == true &&
                        <LoaderTwo
                            style={{ position: 'absolute' }}
                        />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Theme.BLUE }]}
                    onPress={() => passRequest()}
                >
                    <Text style={styles.btnText}>Pass</Text>
                    <Icon
                        name={'next_1'}
                        color={Theme.WHITE}
                        size={normalize(14)}
                        config={icoMoonConfigSet}
                    />
                    {
                        passLoader == true &&
                        <LoaderTwo
                            style={{ position: 'absolute' }}
                        />
                    }
                </TouchableOpacity>

            </View>
        </View>
    )
}