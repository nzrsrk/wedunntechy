import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Theme from '../styles/Theme';
import { Icon, icoMoonConfigSet } from '../styles/Icons';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';


import ContentLoader, {
    FacebookLoader,
    InstagramLoader,
    Bullets
} from "react-native-easy-content-loader";
import moment from 'moment';

import { FetchCalling } from '../routes/APICalls';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { normalize } from './Normalize'



export const OrderView = ({ data, headerstyle, containerStyle, footer, contentStyle, navigation }) => {

    let subserviceList = '';

    if (data.SubServiceList) {
        subserviceList = data.SubServiceList.split(",");
    }

    return (
        <View style={[GlobalStyles.commonPaddingH, GlobalStyles.commonPaddingV]}>
            <View style={headerstyle} >
                <Text style={[styles.title,]}>{data.EndUserName ? data.EndUserName : 'Not Available'}</Text>
                <Text style={[styles.title,]}>Order Id:{' ' + data.Id}</Text>
            </View>
            <View style={[containerStyle]}>
                <View style={[styles.contentContainer]}>
                    <View style={{ paddingHorizontal: widthPercentageToDP(1) }}>
                        <View style={[styles.row, { flexWrap: 'wrap' }]}>
                            {
                                Boolean(data?.SubServiceList) &&
                                <View>
                                    {subserviceList.map((items, i) => {
                                        return (
                                            <Text key={i} style={[GlobalStyles.TextSmallRegular, { marginBottom: heightPercentageToDP(.5) }]}>{'\u25CB'}  {items}</Text>
                                        )
                                    })}
                                </View>
                            }
                            <View style={[styles.align]}>
                                <View style={styles.contentWrapper}>
                                    <View style={styles.icontext}>
                                        <Icon
                                            name={'servicesmenu'}
                                            color={Theme.BLUE}
                                            size={normalize(14)}
                                            config={icoMoonConfigSet}
                                        />
                                        <Text style={[GlobalStyles.TextSmallRegular, { marginLeft: widthPercentageToDP(.5) }]}>
                                            {data.CreateDate && moment(data.CreateDate).format('LT') + " | "}
                                            {data.CreateDate && moment(data.CreateDate).format('DD.MM.yyyy')}
                                        </Text>
                                    </View>
                                    <View style={[styles.icontext]}>
                                        <Icon
                                            name={'location'}
                                            color={Theme.BLUE}
                                            size={normalize(14)}
                                            config={icoMoonConfigSet}
                                        />
                                        <Text style={[GlobalStyles.TextSmallRegular, { marginLeft: 5 }]}>
                                            {data.Street && data.Street}
                                            {data.City && " | " + data.City}
                                            {data.District && " | " + data.District}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                    {footer}
                </View>
            </View>
        </View>

    )
}




const styles = StyleSheet.create({
    container: {
        ...Typography.container
    },



    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: heightPercentageToDP(2),
    },
    align: {
        marginTop: heightPercentageToDP(2),
        alignItems: 'flex-end',
        alignSelf: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        // alignContent: 'flex-end'
    },
    icontext: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Theme.GRAY_OPACITY,
        borderWidth: 1,
        paddingHorizontal: widthPercentageToDP(.5),
        paddingVertical: heightPercentageToDP(.3),
        marginBottom: heightPercentageToDP(1),
        alignSelf: 'flex-end',

    },

    title: {
        ...GlobalStyles.TextMediumBold,
        color: "#707070"
    },
    contentContainer: {
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
    },
    contentWrapper: {
        width: '98%'
    }

})