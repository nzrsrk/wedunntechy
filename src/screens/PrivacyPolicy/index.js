import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SectionList,
    Platform
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import Typography from '../../styles/Typography';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';

import { StatusBarHeight } from '../../helper/Statusbar';


import Accordion from 'react-native-collapsible/Accordion';
import GobackButton from '../../components/GobackButton';


import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

// const data = [
//     {
//         title: 'Heading 1',
//         data: [
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//             'But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage ',
//             'More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//             'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.',
//             'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero.'
//         ]
//     },
//     {
//         title: 'Heading 2',
//         data: [
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//             'But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage ',
//             'More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//             'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.',
//             'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero.'
//         ]
//     },
//     {
//         title: 'Heading 3',
//         data: [
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//             'But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage ',
//             'More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//             'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.',
//             'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero.',
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
//             'But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage ',
//             'More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//             'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
//             'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.',

//         ]
//     },
// ]

const data = [
    {
        title: "WEDUNN privacy policy has been compiled to better serve customers who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. If you do not agree with the policy, please do not use the WEDUNN website or mobile application.",
        desc: 'Note: Our privacy policy may change at any time without prior notification. To make sure that you are aware of any changes, kindly review the policy periodically.When ordering or registering on our site/application, as appropriate, you may be asked to enter your name, email address, communication address, mobile number, Family members Contact Numbers or other details to help you with your experience.'
    },
    {
        title: 'What personal information do we collect from the people that visit our blog, website or app?',
        desc: "When ordering or registering on our site/application, as appropriate, you may be asked to enter your name, email address, communication address, mobile number, Location, Family member’s Contact Numbers or other details to help you with your experience. If you sign up to use our Services as a merchant or a service partner, we may collect location details, copies of government identification documents and other details (KYC), call and SMS details.  Location information: Depending on the Services that you use, and your app settings or device permissions, we may collect your real-time information or approximate location information as determined through data such as GPS, IP address; Some of these services require your personal data for the feature to work and we may associate location data with your device ID and other information we hold about you. We keep this data for no longer than is reasonably necessary for providing services to you. If you wish to use the particular feature, you will be asked to consent to your data being used for this purpose. You can withdraw your consent at any time by disabling the GPS or other location-tracking functions on your device, provided your device allows you to do this. See your device manufacturer's instructions for further details."
    },
    {
        title: 'When do we collect information?',
        desc: 'WEDUNN collect information from you when you register on our site/application or request for a service on our site/application'
    },
    {
        title: 'How do we use your information?',
        desc: "WEDUNN may use the information we collect from you when you register, make a request, sign up for our newsletter, respond to a survey or marketing communication, or use certain other site features in the Following ways: To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested. To allow us to better service you in responding to your customer service requests. To administer a contest, promotion, survey or other site feature. To quickly process your transactions. To reach your location for servicing/delivering products."
    },
    {
        title: 'How do we protect visitor information?',
        desc: 'WEDUNN do not use vulnerability scanning and/or scanning to PCI standards. WEDUNN use regular Malware Scanning. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. WEDUNN implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information. All transactions are processed through a gateway provider and are not stored or processed on our servers.'
    },
    {
        title: 'DISCLOSURE AND DISTRIBUTION OF YOUR INFORMATION',
        desc: 'We may share your information that we collect for the following purposes: With Service Providers: We may share your information with our vendors, consultants, marketing partners, research firms and other service providers or business partners, such as payment processing companies, to support our business. For example, your information may be shared with outside vendors to send you emails and messages or push notifications to your devices in relation to our Services, to help us analyze and improve the use of our Services, to process and collect payments. We also may use vendors for other projects, such as conducting surveys or organizing sweepstakes for us. With Partner Merchant: While you place a service request through the Wedunn Platform, your information is provided to us and to the merchants for parts or accessories. With Other Users: If you are a service partner, we may share your name, phone number and/or profile picture (if applicable), tracking details with other users to provide them with the Services.'
    },
    {
        title: "Do we use 'cookies'?",
        desc: "Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. WEDUNN also use cookies to help us compile aggregate data about site traffic and site interaction so that WEDUNN can offer better site experiences and tools in the future"
    },
    {
        title: 'We use cookies to:',
        desc: "Help remember and process the items in the shopping cart. Understand and save user's preferences for future visits. Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. WEDUNN may also use trusted third-party services that track this information on our behalf. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies. If you disable cookies off, some features will be disabled. It will not affect the users’ experience that makes your site experience more efficient and some of our services will not function properly. However, you can still place orders. Third Party Disclosure WEDUNN do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. Third party links WEDUNN do not include or offer third party products or services on our website. How does our site handle do not track signals? WEDUNN honour do not track signals and do not track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place. Does our site allow third party behavioural tracking? It's also important to note that we do not allow third party behavioural tracking. In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur: WEDUNN will notify the users via email/phone Within 1 business day WEDUNN will notify the users via in site notification Within 1 business day WEDUNN also agree to the individual redress principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only those individuals have enforceable rights against data users, but also that individuals have recourse to courts or a government agency to investigate and/or prosecute noncompliance by data processors."
    }
]

export default function PrivacyPolicy({ navigation, route }) {

    // set the active screen

    const { statusBarIdenti } = route.params
    const [activeSections, setactiveSections] = useState([0]);



    const _renderHeader = (section, index, isActive, sections) => {
        return (
            <Text style={[GlobalStyles.para3, { fontWeight: 'bold' }]} >
                {index + 1}.  {section.title}
            </Text>
        );
    };
    const _renderContent = section => {
        return (
            <Text style={[GlobalStyles.para3]} >
                {section.desc}
            </Text>
        );
    };
    const _updateSections = (activeSections) => {
        setactiveSections(activeSections);
    };

    return (
        <View style={[GlobalStyles.container,
            //  statusBarIdenti == 'no' && { marginTop: StatusBarHeight }
        ]}>
            {statusBarIdenti == 'no' && Platform.OS === 'ios' && <GobackButton navigation={navigation} color={'black'} />}
            <Text style={[styles.headWrap]}>Privacy Policy</Text>
            <ScrollView style={[styles.contentWrap]}>
                <Accordion
                    underlayColor={'transparent'}
                    sections={data}
                    activeSections={activeSections}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    sectionContainerStyle={{ marginVertical: heightPercentageToDP(.5), }}
                />
            </ScrollView>
        </View>
        // <ScrollView style={[GlobalStyles.container, statusBarIdenti == 'no' && { marginTop: Constants.statusBarHeight }]}>
        //     <View style={{ marginBottom: 15 }}>
        //         <Text style={[styles.headWrap]}>Privacy Policy</Text>
        //         <Text style={[GlobalStyles.para3, GlobalStyles.commonPaddingH]}>
        //             But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage
        //         </Text>
        //     </View>
        //     <View style={[styles.contentWrap]}>
        //         {data.map((item, index) => {
        //             return (
        //                 <View style={{ marginBottom: 15 }} key={index}>
        //                     <Text style={[styles.subHead]}>{item.title}</Text>
        //                     {
        //                         (item.data).map((item, index) => {
        //                             return (
        //                                 <Text key={index} style={[GlobalStyles.para3]}>
        //                                     {index + 1}. {item}
        //                                 </Text>
        //                             )
        //                         })
        //                     }
        //                 </View>
        //             )

        //         })

        //         }
        //     </View>
        // </ScrollView >
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