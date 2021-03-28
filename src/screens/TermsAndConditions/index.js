import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SectionList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
//     " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     "But also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage",
//     " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     " Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
//     "Richard McClintock, a Latin professor at Hampden- Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.",
//     "But also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage",
//     " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     " Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
//     "Richard McClintock, a Latin professor at Hampden- Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.",
//     " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     "But also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage",
//     " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     " Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
//     "Richard McClintock, a Latin professor at Hampden- Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.",
//     "But also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage",
//     " More recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     " Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
//     "Richard McClintock, a Latin professor at Hampden- Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.",
// ]

const data = [{ title: 'Intellectual Property Rights', desc: 'WEDUNN is owned and managed under copyright act by Wedunn Service Technologies Pvt Ltd. All aspects of WEDUNN website and application, such as the designs, transactional flow, look and feel, contents, graphics and images including logo are protected under copyright act. As the law enforces, users are restricted from downloading, reusing, reconfiguring or imitating any of the proprietary material. Any such activity is expressly prohibited without prior permission of Wedunn Service Technologies Pvt Ltd. If Wedunn Service Technologies Pvt Ltd. identifies that any user engaged in such activities; appropriate legal action may be taken, including without limitation civil, criminal and injunctive redress.' },
{ title: 'Use of WEDUNN Platforms (Web/App)', desc: 'The WEDUNN is a common platform for users and service partners that may contain profiles, email facility, chat facility, blogs, job posting, advertisements and other communication channels to communicate with each other or to avail the services. Hence, users may use these facilities only to send and receive messages that are relevant and appropriate to the intended use. Violation of this term may force WEDUNN to take appropriate legal action against the user, including without limitation civil, criminal and injunctive redress.' },
{
    title: 'User Information', desc: 'WEDUNN, during the new account registration, may ask user to share the personal information, which is required to deliver the service. WEDUNN assumes user provides the accurate information about his/her identity, contact information. The given information will be verified during the registration process. WEDUNN only makes a sincere attempt to provide best service to its users and hence does not take full responsibility of suitability, reliability, timeliness, or accuracy of the Services requested and provided by users. WEDUNN does not confirm the identity of users who they claim to be. If WEDUNN finds any information wrong or any malpractice, agreement with user will be terminated with immediate effect.\n\nYou hereby consent to receive communications by SMS, emails or calls from WEDUNN or its affiliates or its partners regarding the services provided by WEDUNN, or as facilitated by the WEDUNN directors.'
},
{ title: 'Service Partner Information', desc: 'WEDUNN performs the background verification and service quality checks of service partners to ensure the safety and security of users. WEDUNN enters into Service Level Agreement (SLA) with every service partner during the on-boarding process. This attempt is a sincere effort to ensure the best and effective service to our users. WEDUNN does not take full responsibility suitability, reliability, timeliness, or accuracy of the services provided. Service partner will be solely responsible for the services delivered, WEDUNN in coordination with service partners will ensure that further support is offered within specific timeframes.' },
{ title: 'Account/Password Protection', desc: 'User is solely responsible for maintaining the confidentiality of password and service account provided by WEDUNN for accessing the offered service. User is solely and fully responsible for all activities that occur under the password or account. WEDUNN has no control and expressly disclaims any liability derived therefrom over the use of any user’s account. If the user is suspicious about the activities under the account or breach of account, he/she should immediately reach WEDUNN to block the account.' },
{ title: 'Termination of Service', desc: 'WEDUNN reserves the right to suspend or terminate your association with us for violation of any of our policies, posted on the website time-to-time. The termination will be with prior notice via mail and it will be effective immediately after the delivery of notice. WEDUNN also reserves the right to take legal action, including without limitation pursuing civil, criminal, and injunctive redress, for inappropriate or offensive behaviour. Breach or violation of any of the policies will enforce the termination or expiration of the agreement with WEDUNN. The termination of agreement will also enforce the cancellation of ongoing requested services, refunds and other disputes by the user. WEDUNN offers 7 to 60 days warranty on service offered via WEDUNN platform (warranty period is varied between services), any additional charges asked by service partner must be informed to customer care (+91 6282 414 332) or help@jwedunn.com before making such payments.' },
{
    title: 'Billing and Payment Policy', desc: 'WEDUNN offers its user to pay the service partner either through mobile wallet, online using net-banking/ debit card or by cash. WEDUNN expressly claims no responsibility of refund for payment made by cash. User is liable to pay the invoiced amount immediately after the work completion. WEDUNN takes no responsibility for money paid to service partner without our knowledge or we have no control over payments made in cash to service partner other than what is agreed between WEDUNN and user. Hence it is important that payments to be made directly to WEDUNN via online payment options available on the platform. We discourage any tips or reward to any of our service partner however if any user is doing so is completely based on their own will and decision.\n\nIf the money gets deducted from the user account and the payment is not reflected in the application, you are requested to contact the WEDUNN customer care support at +91 6282 414 332 or mail at help@wedunn.com. Your payment will be reflected within 48 hours if the transaction is successful at the payment gateway partners. If your payment status is not updated in the given time frame, please contact the bank for further enquiries, WEDUNN does not take responsibility on such cases and payment will reflect in your bank account as per Bank TAT.'
},
{ title: 'Links to Other Websites', desc: 'WEDUNN may contain links to third-party websites or services that are not owned or controlled by Wedunn Service Technologies Pvt. Ltd. Wedunn Service Technologies Pvt. Ltd has no control over and assumes no responsibility for, the content, privacy policies, or practices of any third party websites or services. You further acknowledge and agree that Wedunn service Technologies Pvt. Ltd shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.' },
{ title: 'Service Delivery', desc: 'WEDUNN strongly discourages any direct contact with WEDUNN Service Partners or any service requested directly by the user with the WEDUNN Service Partner, as in such cases has no control or takes no responsibility on whatsoever situation or condition. WEDUNN provide or deal with material or spare parts required for delivering the service. Users are requested to pay for the material to carry out the service or by it through service partners. Service partner is solely responsible/ liable for damages caused during service delivery, in such events user is requested to first contact the customer support team and then may lodge a complaint against the service partner, if the damage is resolved with mutual understanding.\n\nUser is requested to report/inform WEDUNN immediately for any misconduct or unsatisfied behavior of any of our service partner so that we can take necessary action in order to resolve incidents and prevent the occurrence of such incidence in future. However, if the misconduct is falling in the category of breach of law then the user may deal with that as per the applicable laws directly with the service partner and WEDUNN will not be responsible in such case. Also, if the service partner involves in any criminal activities during the service delivery or at any stage of service cycle the user, at its own will can take direct action under the laws of the country and also keep us informed on full details of the same. WEDUNN will not be party to any such action.' },
{
    title: 'Home Appliances & Consumer Electronics', desc: 'Repair Charges /Visit Charges - is the compulsory charges on the technician visit to user premises - needs to be paid by the user on first visit itself\n\nPost technician visit- if any spare needs to be changed or replaced would be extra as per current market rates.\n\nA valid job card and cash receipts issued from the company would be carried by the technician which explains the symptoms observed and job done / suggested for that appliance duly signed by both the technician and the user.\n\nFor any spare part replacement - the user is given the estimation from the back-end team based on the availability of the spare parts and its present market rate.\n\nPost user confirmation/approval to change the spare part as per the estimation, then only the spare part would be ordered - However repeated and commonly failure parts would be available at the service centre for immediate replacement.\n\nService Warranty - warranty for the workmanship is 60 days from the date of work completion (Cash Receipt/ Job card to be produced by the user to avail service warranty).\n\nUser can avail service warranty only for the issue as mentioned in the job card, for any other issues or complaints the charges are applicable as per the rate card\n\nService partner will be solely responsible to provide the taxable invoice, WEDUNN shares the receipt of payment via mail.\n\nThe WEDUNN shall be under no obligation to provide repair/service because of improper use, unauthorized alteration, modification or substitution of any part or Sr. No. of the machine is altered, defaced or removed, abnormal voltage fluctuation, rat bite, and neglect, acts of god like floods, lightening, earthquakes etc. or causes other than ordinary use. If our services are required as a result of the causes stated above, such services shall be at extra charge.\n\nWhile every effort shall be made to give preferential attention to emergency breakdown of the equipment, the company shall not be held responsible for any loss arising.\n\nThe equipment brought to the service centre will remain there at user risk and the company will not be responsible for any damages caused due to the factors beyond its control.\n\nMost of the repairs would be carried out at the user premises only if need arises then the appliance would be called back to the Service centre and Transportation for taking appliance to the Service Centre for repairs shall be borne by the user as per the applicable rates.\n\nAny estimate issued by the service centre is provisional and not binding; in case of variances in market price.'
},
{
    title: 'Online Store', desc: 'WEDUNN offers merchants, merchant referred here can be a brand, store or home-made product manufacturer, a technology platform to list their product, manage the delivery and ensures that they follow the formal procedures to carry out the business. WEDUNN is not responsible for any concern rises from usage of product, quality of product or if the product is out of stock.\n\nYou agree, understand and acknowledge that the WEDUNN is an online platform that enables you to purchase products listed on the website/mobile application at the price indicated therein at any time from the selected city. You further agree and acknowledge that WEDUNN is only a facilitator and is not and cannot be a party to or control in any manner any transactions on the website. Accordingly, the contract of sale of products on the website shall be a strictly bipartite contract between user and the merchants on WEDUNN\n\nIf the user pays online and the product is out of stock or not available for a reason, the paid amount will be refunded within 72 hours. Merchant is solely responsible to update the stock list and price in the DUNN store. It is the responsibility of the merchant to make sure that the product quality is in par with the standards specified by Law. WEDUNN is just an online facilitator to list the product under merchant’s brand in the store. Users and merchants can contact the customer support at store@wedunn.com to know more about the procedures.\n\nSales: Your order is an offer to us to buy the product(s) in your order. When you place an order to purchase a product from us, you will receive an e-mail confirming receipt of your order and containing the details of your order (the "Order Confirmation E-mail"). The Order Confirmation E-mail is acknowledgement that we have received your order and does not confirm acceptance of your offer to buy the product(s) ordered. Our customer care team will contact you or the on the given number to confirm the order or before we dispatch it ensure convenient delivery.\n\nYour contract is with us (the merchants) and you confirm that the product(s) ordered by you are purchased for your internal / personal purpose and not for resale or business purpose. You authorize us to declare and provide declaration to any governmental authority on your behalf stating the aforesaid purpose of the products ordered by you on the website.\n\nUsers can cancel the order for a product at no cost any time before we send the Dispatch Confirmation E-mail/call relating to that product.\n\nPlease note that we sell products only in quantities which correspond to the typical needs of an average household. This applies both to the number of products ordered within a single order and the placing of several orders for the same product where the individual orders comprises a quantity typical for a normal household.\n\nWEDUNN lists availability information for products sold by us on the website, including on each product information page. Beyond what we say on that page or otherwise on the website, we cannot be more specific about availability. Please note that dispatch estimates are just that. They are not guaranteed dispatch times and should not be relied upon as such. As WEDUNN processes your order, you will be informed by e-mail/call if any products you order turn out to be unavailable.'
},
{
    title: 'Events and Deals', desc: 'The WEDUNN website/mobile application is a platform which facilitates promotion of various Offers offered by merchants, on their respective services and products by way of offering coupons. Descriptions of the merchant offerings and products advertised on WEDUNN are provided by the Merchant. WEDUNN is not responsible for any claims associated with the description of the Merchant Offerings or Products. Pricing relating to certain Merchant Offerings, Products, and other available programs on the Site may change at any time in WEDUNN’S’s sole discretion without notice. So, it is advisable to go through the policies before making any purchase on our Site.\n\nRestaurant Services: For the purpose of this section, ‘Restaurant’ shall be defined as an Institution that offers food and beverages for sale in its regular business operations and is making such food and beverages available to purchasers of WEDUNN Coupons. In this respect, the following shall constitute as ‘Standard Terms and Conditions’ for redeeming WEDUNN Coupons:\n\nWEDUNN shall not be responsible for the quality of services provided by the Restaurant, and the same shall be the sole responsibility of the Restaurant.\n\nWEDUNN Coupons are redeemable in their entirety only and may not be redeemed partially or incrementally.\n\nWEDUNN Coupons can be redeemed only after due verification of the customer including, without limitation, matching the unique identification number provided to the customer at the time of purchase of WEDUNN Coupons.\n\n“Coupon expiry date” shall be mentioned on WEDUNN Coupons for your reference.\n\nUse of WEDUNN Coupons for drinks shall be at the sole discretion of the Restaurant and is further subject to all applicable laws.\n\nIt is at the discretion of the Restaurant to determine whether WEDUNN Coupons can be combined with any other Restaurant coupons, third party coupons, coupons, or promotions and the like.\n\nWEDUNN Coupons cannot be used for taxes, tips or prior balances, unless permitted by the Restaurant.\n\nWEDUNN Coupons are valid for dine-in only unless otherwise stated.\n\nThe issuing of restaurant credit is at the sole discretion of the Restaurant.\n\nNeither WEDUNN nor the Restaurant is responsible for lost or stolen Coupons or the reference numbers mentioned on it.\n\nReproduction, sale or trade of WEDUNN Coupons is strictly prohibited.\n\nAny attempted redemption not consistent with these Terms of Use, Standard Terms & Conditions and Specific Terms & Conditions mentioned on the coupon will render the WEDUNN coupon void and invalid.\n\nThe WEDUNN coupon (including, but not limited to, any discounts provided therein) will expire on the date specified on it, and you will not be able to avail the service from the merchant after this date\n\nRestaurants for which the Offers are availed by you will have their own applicable terms and conditions, in relation to their own supply of their goods and services, and you agree to (and shall) abide by those terms and conditions. The responsibility to do so is yours alone.\n\nNon- Restaurant Services: The following shall constitute as ‘Standard Terms and Conditions’ for redeeming WEDUNN Coupons for purchasing Merchant’s goods and/or services from Institutions other than Restaurants:\n\nWEDUNN shall not be responsible for the quality of products and/or services provided by the Institution, and the same shall be the sole responsibility of the Institution.\n\nWEDUNN Coupons are redeemable in their entirety only and may not be redeemed incrementally.\n\nWEDUNN Coupons can be redeemed only after due verification of the customer including, without limitation, matching the unique identification number provided to the customer at the time of purchase of WEDUNN Coupons.\n\nLimit one coupon per redemption. Only one coupon can be used per visit unless otherwise provided in the Specific Terms & Conditions of the coupon or as specified by the Institution.\n\nThe issuing of credit is at the sole discretion of the Institution.\n\nNeither WEDUNN nor the Institution is responsible for lost or stolen Coupons or the reference number mentioned on it. WEDUNN Coupons cannot be combined with any other gift coupons, third party coupons, coupons, or promotions, unless otherwise specified by the Institution.\n\nReproduction, sale or trade of WEDUNN Coupons is strictly prohibited.\n\nAny attempted redemption not consistent with these terms and conditions will render the WEDUNN coupon void and invalid.\n\nInstitutions will have their own applicable terms and conditions, in relation to their own supply of their goods and services, and you agree to (and shall) abide by those terms and conditions. The responsibility to do so is yours alone.\n\nNOTE: A Merchant may advertise goods, services or experiences on the Site, or with respect to Products, supply products to WEDUNN, that require Merchant to have an up-to-date regulatory authorization, license, or certification. WEDUNN does not verify, validate, or collect evidence of any regulatory authorization, license or certification from any Merchant (including, without limitation, but not limited to, Health & Fitness and Beauty & Spa Merchants). Some services for which JOBOOY.IN coupon(s) can be redeemed are activities that involve potential bodily harm (such as different forms of adventure sports and activities.), and for those activities WEDUNN takes no responsibility for the service or activity being offered, and the User takes responsibility for his or her own actions in utilizing the services for which the WEDUNN coupon can be redeemed.'
},
{
    title: 'Payment Service', desc: 'WEDUNN offers bill payment service by only authorised business partners and it is specific to a city/area where WEDUNN/business partners offer specific services. WEDUNN offers convenient and secure payment procedure towards our authorized business partner for valid user ID and using valid payment account. All the successful transactions will be listed in the My Payments page of the application. Payment receipt will be shared to your registered email ID on successful payment. Your services will be active within 24 hours from the time of successful transaction, this is strictly based on service partner’s turnaround time and WEDUNN assumes no responsibility. It is the discretion of our business partner to charge the service tax for offering service.\n\nIf the money gets deducted from the user account and the payment is not reflected in the application, you are requested to contact the WEDUNN customer care support at +91 6282 414 332 or mail at help@jwedunn.com. Your payment will be reflected within 48 hours if the transaction is successful at the payment gateway service provider. If your payment status is not updated in the given time frame, please contact the bank for further enquiries.\n\nUsers are requested to provide valid, accurate and complete information about your identity, payment account details (Card information, Bank account information, wallet credentials), Biller information and the payment information (payment amount and transaction description). WEDUNN reserves the right to terminate user account or refuse your current and future use of service in case your information found suspicious.\n\nWEDUNN assumes no responsibility and shall incur no liability if it is unable to affect any Payment Instruction(s) on the Payment Date owing to any one or more of the following circumstances.\n\nIf the Payment Instruction(s) issued by you is/are incomplete, inaccurate, invalid.\n\nIf the Payment Account has insufficient funds/limits to cover for the amount as mentioned in the Payment Instruction(s)\n\nIf your Bank or the wallet service refuses or delays honouring the Payment Instruction(s)\n\nIf payment is not processed by biller upon receipt.\n\nIf the user crosses transaction limit/amount limit decided by wallet services, payment gateways and banks.\n\nCircumstances beyond the control of WEDUNN, including natural calamities, issues with payment system, power failures etc.\n\nNote: User must ensure seamless Internet connectivity and must have all equipment necessary to make such connection to the World Wide Web, including a computer and modem or other access device. User is solely responsible any fees associated with access to World Wide Web, directly or indirectly access to web content.'
},
{
    title: 'Refund Policy', desc: 'User is permitted to claim refund from WEDUNN for:\n\nFalse Service\n\nIncomplete job\n\nMissing Product\n\nPaid for Non - available product\n\nMisbehaviour from service partner\n\nUser can send a mail to help@wedunn.com within 5 days from the day of job delivery with subject line “Job Reference # - Complaint Category” or raise a complaint against specific order directly from ‘Order History’ page in the mobile application.WEDUNN team will register the complaint and share the complaint number within 24 hours via mail / text message.User will receive the final status of the claim within 7 working days via mail.If the refund request is approved by WEDUNN grievance redressal officer, refund amount will be credited to customer account within 48 hours(excluding holidays).WEDUNN reserves the right to approve or decline a refund request; refund claim will be processed by gathering information about job delivery from service provider.The status of the claim will be shared along with reason for approval / decline with customer via registered mail id.\n\n Note: Refund policy is applicable only to wallet / online payments.'
},
{ title: 'Governing Law', desc: 'These Terms shall be governed and construed in accordance with the laws of Country without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have between us regarding the Service.' },
{ title: 'Dispute Resolution Management', desc: 'WEDUNN reserves the right to manage, resolve or decline the disputes with user. Any disputes raised by user will be processed by the WEDUNN team and notify the user on acceptance of dispute, via mail along with complaint number. WEDUNN team will enquire the complaint and based on the finding’s user will be receiving the response from WEDUNN team within 7 working days from the day of complaint. If the user is not satisfied with the resolution, the parties agree to resolve the matter amicably vide arbitration under the Indian Arbitration & Conciliation Act, 1996. The venue of the arbitration shall be Cochin, India. The language of the arbitration shall be English.' },
{ title: 'Changes to the ‘Terms & Conditions’ and Other Policies', desc: 'WEDUNN reserves the right, at our sole discretion, to modify, delete or replace the terms and conditions or any other policies at any time, with or without prior notice to the user. . What constitutes a material change will be determined at our sole discretion. We ensure our sincere effort to bring the changes via mail and application to accept the changes. We request the users and service partners to visit the policies and terms & conditions at a certain frequency to update the same. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.' },
]



const Item = ({ item, index }) => (
    <View style={[styles.TemsWrapper]}>
        <Text style={[styles.TextStyleNum, { marginRight: 3 }]}>{index + 1}.</Text>
        <Text style={styles.TextStyle}>
            {item}
        </Text>
    </View>

);

export default function TermsAndConditions({ navigation, route }) {

    // set the active screen
    const [activeSections, setactiveSections] = useState([0]);


    const { statusBarIdenti } = route.params;

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
            // statusBarIdenti == 'no' && { marginTop: StatusBarHeight }
        ]}>
            {statusBarIdenti == 'no' && Platform.OS === 'ios' && <GobackButton navigation={navigation} color={'black'} />}
            <Text style={[styles.headWrap]}>Terms & Conditions</Text>
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
        //     <Text style={[styles.headWrap]}>Terms & Conditions</Text>

        //     <View style={[styles.contentWrap]}>
        //         {data.map((item, index) => {
        //             return (
        //                 <View>
        //                     <Text style={[GlobalStyles.para3]} key={index}>
        //                         {index + 1}.  {item.title}
        //                     </Text>
        //                     <Text style={[GlobalStyles.para3]} key={index}>
        //                         {item.desc}
        //                     </Text>
        //                 </View>
        //             )
        //         })

        //         }
        //     </View>

        // </ScrollView>
    )
}


const styles = StyleSheet.create({
    headWrap: {
        padding: heightPercentageToDP(2),
        paddingVertical: heightPercentageToDP(2),
        color: Theme.PRIMARY_COLOR,
        fontFamily: 'Roboto-Bold',
        fontSize: Theme.FONT_SIZE_MEDIUM
    },
    contentWrap: {
        paddingHorizontal: heightPercentageToDP(2),
    },
})

