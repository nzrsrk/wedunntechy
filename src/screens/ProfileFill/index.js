import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import Theme from '../../styles/Theme'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import Typography from '../../styles/Typography';
import GlobalStyles from '../../styles/GlobalStyles';

import moment from 'moment';

import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
import {
    useFocusEffect,
} from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
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

const SECTIONS = [
    {
        title: 'Bank Details',
    },
    {
        title: 'Personal Details',
    },
];


export default function ProfileFill({ navigation }) {

    // set the active screen

    const [activeSection, setactiveSection] = useState([0]);
    const [userInfo, setUserInfo] = useState(null);
    const [userinfoLoader, setUserInfoLoader] = useState(true);

    var date = new Date();
    var today = date.getDay();
    var weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    useFocusEffect(
        React.useCallback(() => {

            const getFunction = async () => {
                try {
                    let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                    details.timing = []
                    var day = 0
                    for (let i = 0; i < parseInt(details?.BusinessDays); i++) {
                        if (parseInt(details?.BusinessDays) > 6) {
                            day = i
                        }
                        else
                            day = i + 1
                        details?.timing.push({ day: weekday[day], timing: details?.BusinessTime })
                    }
                    if (details) {
                        await setUserInfo(details);
                        setUserInfoLoader(false);
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

            return () => {
                setUserInfoLoader(true);
            }

        }, [])
    );


    const _renderHeader = (section, index, isActive,) => {
        return (
            <View style={[styles.collapseHeaderStyle, { backgroundColor: (isActive) ? Theme.BLUE : '#4D7AA2' }]} >
                <Text style={[GlobalStyles.TextBoldLarge, styles.collapseTitle]}>{section.title}</Text>
                <Icon
                    style={{ transform: (isActive) ? [{ rotate: '0deg' }] : [{ rotate: '270deg' }] }}
                    name='downarrow'
                    color={Theme.WHITE}
                    size={normalize(16)}
                    config={icoMoonConfigSet}
                />
            </View>

        );
    };

    const _renderContent = (section, index, isActive, sections) => {

        switch (index) {

            case 0:
                return (
                    <BankDetails userInfo={userInfo} />
                )
                break;

            case 1:
                return (
                    <Personal userInfo={userInfo} />
                )
                break;
        }
    };

    const _updateSections = (activeSections) => {
        setactiveSection(activeSections);
    };


    return (
        <ScrollView style={styles.container}>

            {userinfoLoader == true ?
                <View>
                    <FacebookLoader
                        aSize={normalize(90)}
                        active
                        pRows={15}
                        pHeight={[0, heightPercentageToDP(1), 0, heightPercentageToDP(4), 0, 0, 0, heightPercentageToDP(5)]}
                    />
                </View>
                :
                <View>
                    <View style={[styles.imageWrapper]}>
                        <Image
                            style={styles.image}
                            source={userInfo?.Image ? { uri: userInfo?.Image } : require('../../assets/images/others/FakeDP.png')}
                        />
                        <View style={styles.contentWrapper}>
                            <TouchableOpacity style={styles.editWrapper} onPress={() => { navigation.navigate('ChangePassword') }}>
                                <Icon
                                    name='edit_1'
                                    color={Theme.BLUE}
                                    size={normalize(14)}
                                    config={icoMoonConfigSet}
                                />
                                <Text style={styles.editText}>Change Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editWrapper} onPress={() => { navigation.navigate('EditProfile') }}>
                                <Icon
                                    name='edit_1'
                                    color={Theme.BLUE}
                                    size={normalize(14)}
                                    config={icoMoonConfigSet}
                                />
                                <Text style={styles.editText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {userInfo &&
                        <GeneralDetails userInfo={userInfo} />
                    }
                    <Accordion
                        sectionContainerStyle={{ marginBottom: heightPercentageToDP(.5) }}
                        sections={SECTIONS}
                        activeSections={activeSection}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={_updateSections}
                    />
                </View>
            }
        </ScrollView >
    )
}

function GeneralDetails({ userInfo }) {
    const services = userInfo.OfferService
    return (
        <View>
            <View style={styles.containersStyle}>

                <View style={styles.itemsContainer}>
                    <Text style={[GlobalStyles.TextMediumRegular, { marginBottom: heightPercentageToDP(2) }]}>Offered Service Categories</Text>

                    <View style={[GlobalStyles.alignCenter, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                        {services?.split(',')?.map((data, index) => {
                            return (
                                <View key={index} style={styles.services}>
                                    <Text style={[GlobalStyles.TextMediumBold, { color: '#37537D' }]}>{data}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

            </View>

            <View style={styles.containersStyle}>
                <Text style={[GlobalStyles.TextBoldLarge, { color: Theme.BLUE, fontSize: Theme.FONT_TWNETY }]}>{userInfo?.FirstName + ' ' + userInfo?.LastName}</Text>
                <Text style={GlobalStyles.TextSmallRegular}>{userInfo?.Email}</Text>
                <Text style={GlobalStyles.TextSmallRegular}>{userInfo?.Mobile}</Text>
            </View>

            {/* <View style={styles.containersStyle}>
                <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                    <Icon
                        name='location'
                        color={Theme.GREEN}
                        size={16}
                        config={icoMoonConfigSet}
                    />
                    <Text style={[GlobalStyles.TextSmallBold, { color: '#8D8D8D' }]}>Address</Text>
                </View>
                <Text style={[GlobalStyles.TextSmallRegular, { textAlign: 'center', width: 150 }]}>
                    {userInfo?.Address}
                </Text>
            </View>
 */}

            <ServiceTiming timing={userInfo?.timing} />

            <View style={styles.containerdetailsStyle}>
                <View style={[styles.detailsAlign]}>
                    <Text style={[styles.label]}>Status</Text>
                    <Text style={[styles.content]}>Own Driven</Text>
                </View>
                <View style={[styles.detailsAlign]}>
                    <Text style={[styles.label]}>City / Town</Text>
                    <Text style={[styles.content]}>{userInfo?.CityTown}</Text>
                </View>
                {/* <View style={[styles.detailsAlign]}>
                    <Text style={[styles.label]}>Region</Text>
                    <Text style={[styles.content]}>{userInfo?.Region}</Text>
                </View> */}
                <View style={[styles.detailsAlign]}>
                    <Text style={[styles.label]}>Name of the Owner</Text>
                    <Text style={[styles.content]}>{userInfo?.NameOfDealer}</Text>
                </View>
                <View style={[styles.detailsAlign]}>
                    <Text style={[styles.label]}>ID Number </Text>
                    <Text style={[styles.content]}>{userInfo?.IdCardNo}</Text>
                </View>
            </View>

        </View>

    )
}



function RenderTimings({ time, index, today }) {
    return (
        <View key={index} style={styles.item} >
            {/* current day background color */}
            <View style={{ flexDirection: 'row', marginHorizontal: '5%', marginVertical: '3%' }}>
                <View style={[today === index ? [Typography.elevation, styles.today,] : styles.day]}>
                    <Text style={[GlobalStyles.TextSmallRegular, today === index ? { color: "#fff" } : { color: "#9E9E9E" }]}>{time.day}</Text>
                </View>
                <View style={styles.time}>
                    <Text style={[GlobalStyles.TextSmallRegular, { fontFamily: "Roboto-Bold" }]}>{time.timing}</Text>
                </View>
            </View>
        </View>

    )
}
function ServiceTiming({ timing }) {
    const [collapsed, setcollapsed] = useState(true);

    var date = new Date();
    var today = date.getDay();
    const toggleExpanded = () => {
        setcollapsed(!collapsed)
    }
    return (

        <View style={[styles.containersStyle]}>
            <TouchableOpacity onPress={() => toggleExpanded()} style={[styles.collapseHeaderStyle,]}>
                <Text style={[GlobalStyles.TextBoldLarge, { textAlign: 'center', marginHorizontal: heightPercentageToDP(1) }]}>Service Timing</Text>
                <Icon
                    style={{ transform: (collapsed) ? [{ rotate: '270deg' }] : [{ rotate: '0deg' }] }}
                    name='downarrow'
                    color={Theme.GREY_1}
                    size={normalize(16)}
                    config={icoMoonConfigSet}
                />
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>

                <View style={styles.bussinessContainer}>
                    <View style={[styles.bussinessContainerInner]}>
                        {
                            timing?.map((item, index) => {
                                return (
                                    <RenderTimings key={index} time={item} index={index} today={timing?.length > 6 ? today : today - 1} />
                                )
                            })
                        }
                    </View>
                </View>
            </Collapsible>
        </View >
    )
}

function BankDetails({ userInfo }) {
    return (
        <View >
            <View style={[GlobalStyles.commonPaddingV, { paddingHorizontal: widthPercentageToDP(3) }]}>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>Name of your Banker</Text>
                    <Text style={[styles.content2]}>{userInfo?.NameOfBanker}</Text>
                </View>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>Name of the Organization as per Bank Records</Text>
                    <Text style={[styles.content2]}>{userInfo?.NameOfOrg} </Text>
                </View>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>Branch  </Text>
                    <Text style={[styles.content2]}>{userInfo?.BranchName} </Text>
                </View>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>MICR Code</Text>
                    <Text style={[styles.content2]}>{userInfo?.MICRCode} </Text>
                </View>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>IFSC Code</Text>
                    <Text style={[styles.content2]}>{userInfo?.IFSCCode} </Text>
                </View>
                <View style={[styles.detailsAlign2, { borderBottomWidth: 0 }]}>
                    <Text style={[styles.label2]}>Bank Account No</Text>
                    <Text style={[styles.content2]}>{Boolean(userInfo?.BankAccountNo) && userInfo?.BankAccountNo}  </Text>
                </View>
            </View>



        </View >
    )
}



function Personal({ userInfo }) {
    return (
        <View style={{ marginVertical: heightPercentageToDP(.2) }} >
            <View style={[GlobalStyles.commonPaddingV, { paddingHorizontal: widthPercentageToDP(3) }]}>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>Name of the Service Provider </Text>
                    <Text style={[styles.content2]}>{Boolean(userInfo?.NameOfDealer) && userInfo?.NameOfDealer}</Text>
                </View>
                <View style={[styles.detailsAlign2]}>
                    <Text style={[styles.label2]}>Date of Birth </Text>
                    <Text style={[styles.content2]}>{moment(userInfo?.DateOfBirth).format('DD MMMM YYYY')} </Text>
                </View>
                <View style={[styles.detailsAlign2, { borderBottomWidth: 0 }]}>
                    <Text style={[styles.label2]}>Full Residential Address </Text>
                    <Text style={[styles.content2]}>
                        {Boolean(userInfo?.StreetAddress) && userInfo?.StreetAddress + ' '}
                        {Boolean(userInfo?.CityTown) && userInfo?.CityTown + ' '}{Boolean(userInfo?.District) && userInfo?.District + '\n'}
                        {Boolean(userInfo?.State) && userInfo?.State + ' '}
                        {Boolean(userInfo?.Pincode) && userInfo?.Pincode + '\n'}</Text>
                </View>
            </View>

        </View >
    )
}

