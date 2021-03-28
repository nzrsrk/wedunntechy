import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import GlobalStyles from '../../styles/GlobalStyles';
import Theme from '../../styles/Theme';


import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

import { StatusBarHeight } from '../../helper/Statusbar';

const data = [
    {
        title: 'WHAT PERSONAL INFORMATION DO WE COLLECT FROM THE PEOPLE THAT VISIT OUR BLOG, WEBSITE OR APP ?',
        data: [
            "When ordering or registering on our site/application, as appropriate, you may be asked to enter your name, email address, communication address, mobile number, Family members' Contact Numbers or other details to help you with your experience."
        ]
    },
    {
        title: 'WHEN DO WE COLLECT INFORMATION ?',
        data: [
            "WEDUNN collect information from you when you register on our site/application or request for a service on our site/application."
        ]
    },
    {
        title: 'HOW DO WE USE YOUR INFORMATION ?',
        data: [
            "WEDUNN may use the information we collect from you when you register, make a request,sign up for our newsletter, respond to a survey or marketing communication, or use certain other site features in the,   Following ways:",
            "To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.",
            "To allow us to better service you in responding to your customer service requests.",
            "To administer a contest, promotion, survey or other site feature.",
            "To quickly process your transactions."
        ]
    },
    {
        title: 'HOW DO WE PROTECT VISITOR INFORMATION ?',
        data: [
            "WEDUNN do not use vulnerability scanning and/or scanning to PCI standards. WEDUNN use regular Malware Scanning.",
            "Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.",
            "WEDUNN implement a variety of security measures when a user places an order enters,submits, or accesses their information to maintain the safety of your personal information.",
            "All transactions are processed through a gateway provider and are not stored or processed on our servers."
        ]
    },
    {
        title: "DO WE USE ' COOKIES '?",
        data: [
            "Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. WEDUNN also use cookies to help us compile aggregate data about site traffic and site interaction so that WEDUNN can offer better site experiences and tools in the future. We use cookies to:",
            "Help remember and process the items in the shopping cart.",
            "Understand and save user's preferences for future visits.",
            "Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. WEDUNN may also use trusted third-party services that track this information on our behalf.",
            "You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.",
            "If you disable cookies off, some features will be disabled. It will not affect the users’ experience that makes your site experience more efficient and some of our services will not function properly. However, you can still place orders.",
        ]
    },
    {
        title: 'THIRD PARTY DISCLOSURE',
        data: [
            "WEDUNN do not sell, trade, or otherwise transfer to outside parties your personally identifiable information."
        ]
    },
    {
        title: 'THIRD PARTY LINKS',
        data: [
            "WEDUNN do not include or offer third party products or services on our website."
        ]
    },
    {
        title: 'HOW DOES OUR SITE HANDLE DO NOT TRACK SIGNALS ?',
        data: [
            "WEDUNN honour do not track signals and do not track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place."
        ]
    },
    {
        title: 'DOES OUR SITE ALLOW THIRD PARTY BEHAVIOURAL TRACKING ?',
        data: [
            "It's also important to note that we do not allow third party behavioural tracking."
        ]
    },
    {
        title: 'IN ORDER TO BE IN LINE WITH FAIR INFORMATION PRACTICES WE WILL TAKE THE FOLLOWING RESPONSIVE ACTION, SHOULD A DATA BREACH OCCUR:',
        data: [
            "WEDUNN will notify the users via email/phone",
            "Within 1 business day",
            "WEDUNN will notify the users via in site notification",
            "Within 1 business day",
            "WEDUNN also agree to the individual redress principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only those individuals have enforceable rights against data users, but also that individuals have recourse to courts or a government agency to investigate and/or prosecute noncompliance by data processors."
        ]
    },
]





export default function PaymentPolicy({ navigation }) {

    // set the active screen


    return (
        <ScrollView style={[GlobalStyles.container]}>
            <View style={{ marginBottom: heightPercentageToDP(2) }}>
                <Text style={[styles.headWrap]}>Payment Policy</Text>
                <Text style={[GlobalStyles.para3, GlobalStyles.commonPaddingH]}>
                    WEDUNN payment policy has been compiled to better serve customers who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. If you do not agree to the policy, please do not use the WEDUNN website or mobile application.

                    Note: Our privacy policy may change at any time without prior notification. To make sure that you are aware of any changes, kindly review the policy periodically.
                </Text>
            </View>
            <View style={[styles.contentWrap]}>
                {data.map((item, index) => {
                    return (
                        <View style={{ marginBottom: heightPercentageToDP(2) }} key={index}>
                            <Text style={[styles.subHead]}>{item.title}</Text>
                            {
                                (item.data).map((item, index) => {
                                    return (
                                        <Text key={index} style={[GlobalStyles.para3]}>
                                            {index + 1}. {item}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    )
                })

                }
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    headWrap: {
        padding: heightPercentageToDP(2),
        color: Theme.PRIMARY_COLOR,
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    contentWrap: {
        paddingHorizontal: heightPercentageToDP(2),
    },

    subHead: {
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        color: '#374045',
        marginBottom: heightPercentageToDP(2)
    }
})