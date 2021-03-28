import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import GlobalStyles from '../../styles/GlobalStyles';
import styles from './styles';
import Theme from '../../styles/Theme';


import OTPTextView from 'react-native-otp-textinput';


import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';



export default function Subscription({ navigation }) {
    // set the active screen

    return (
        <ScrollView style={[GlobalStyles.container]}>

            <View style={[styles.alignCenter, GlobalStyles.commonPaddingV, { marginBottom: heightPercentageToDP(2) }]}>

                <View style={[styles.alignCenter, { paddingHorizontal: widthPercentageToDP(3) }]}>
                    <Text style={{ fontSize: Theme.FONT_TWNETY, fontFamily: 'Roboto-Light', color: Theme.BLUE }}>Subscription</Text>
                    <Text style={[GlobalStyles.TextSmallLight, { textAlign: 'center', paddingVertical: heightPercentageToDP(1) }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</Text>
                </View>

                <View style={[styles.alignCenter, GlobalStyles.commonPaddingV]}>
                    <Text style={[GlobalStyles.TextMediumLight,]}>Subscription Amount</Text>
                    <Text style={GlobalStyles.TextMediumBold}>$3200.00</Text>
                </View>

                <Button
                    icon={
                        <Icon
                            name='Next_2'
                            color={Theme.WHITE}
                            size={normalize(18)}
                            config={icoMoonConfigSet}
                        />
                    }
                    iconRight
                    title="ACCEPT AND PAYNOW"
                    titleStyle={[GlobalStyles.TextMediumBold, { paddingHorizontal: widthPercentageToDP(1) }]}
                    buttonStyle={[styles.buttonStyle]}
                />
            </View>



            <Image
                style={styles.image}
                resizeMode='stretch'
                source={require('../../assets/images/others/subscription.png')}
            />


            <View style={[GlobalStyles.commonPaddingH, {}]}>

                <View style={styles.containerProduct}>
                    <Icon
                        name='Next_2'
                        color={Theme.BLUE}
                        size={normalize(18)}
                        config={icoMoonConfigSet}
                    />
                    <Text style={[GlobalStyles.TextBoldLarge, GlobalStyles.commonPaddingH, { color: Theme.DIM_GRAY, }]}>Do you have a product key ?</Text>
                    <Text style={GlobalStyles.TextSmallLight}>Enter here</Text>
                </View>

                <View style={[{ flexDirection: 'row', alignItems: 'center', height: heightPercentageToDP(4) }]}>
                    <OTPTextView
                        handleTextChange={(e) => { }}
                        tintColor='#ddd'
                        containerStyle={styles.textInputContainer}
                        textInputStyle={styles.roundedTextInput}
                        inputCount={4}
                        inputCellLength={1}
                    />
                    <Button
                        title='Enter'
                        type='outline'
                        titleStyle={styles.buttonTitle}
                        buttonStyle={styles.buttonStyle2}
                    />
                </View>

            </View>


        </ScrollView>
    );
}
