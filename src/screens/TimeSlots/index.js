import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    VirtualizedList,
} from 'react-native';
import styles from './styles';
import Theme from '../../styles/Theme';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import GlobalStyles from '../../styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


import moment from 'moment';

import {
    useFocusEffect,
} from '@react-navigation/native';

import { FetchCalling } from '../../routes/APICalls';

import ContentLoader, {
} from "react-native-easy-content-loader";

import { showMessage } from "react-native-flash-message";

import {
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

const RenderWorks = ({ work, index }) => {
    return (
        <View style={[styles.align, styles.singleCol,
            //  { borderLeftWidth: (index % 2) != 0 ? 1 : 0 }
        ]}>

            <View style={{}}>
                <View style={styles.columnContent}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.data}> {work.Name}</Text>
                </View>
                <View style={styles.columnContent}>
                    <Text style={styles.label}>Place:</Text>
                    <Text style={styles.data}> {work.Place}</Text>
                </View>
                <View style={styles.columnContent}>
                    <Text style={styles.label}>Order Id:</Text>
                    <Text style={styles.data}>{work.OrderId}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footeText}>{work.LastStatus}</Text>
            </View>
        </View>
    )
}


const RenderItem = ({ date, item, index }) => {
    return (
        <View style={[GlobalStyles.commonPaddingV, GlobalStyles.commonPaddingH]}>

            {index == 0 &&
                <Text
                    style={[GlobalStyles.TextMediumBold, { color: Theme.BLUE, marginBottom: 30 }]}
                >
                    Time Slots
                </Text>
            }

            <View style={[styles.titleContainer]}>
                <Icon
                    name={'servicesmenu'}
                    color={Theme.GREEN}
                    size={normalize(20)}
                    config={icoMoonConfigSet}
                />
                <Text style={styles.titleText}>{moment(date).format('dddd | D.M.YYYY ')}</Text>
            </View>

            <View style={[styles.contentContainer]}>
                {
                    item.map((item, index) => {
                        return (
                            <RenderWorks work={item} index={index} key={index} />
                        )
                    })
                }
            </View>


        </View>
    )
}



const TimeSlots = ({ navigation }) => {
    const [slotLoader, setSlotLoader] = useState(true);
    const [slotData, setSlotData] = useState([]);
    const [TimeSlotLoader, setTimeSlotLoader] = useState(true);
    const [Data, setData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const detailsCollection = async () => {
                setSlotLoader(true);
                let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
                let passData = {
                    AssignedSPId: details?.Id
                }
                let pageFinder = 'TimeSlotView';
                await FetchCalling(passData, setSlotData, setSlotLoader, pageFinder);
            }
            detailsCollection();
            return () => {
                setSlotLoader(true);
            }

        }, [])
    );


    useEffect(() => {
        if (slotLoader == false) {
            // console.log(slotData)
            if (slotData.Success) {
                const values = groupByDate(['Date'])
                var result = values(slotData.Data)
                let result2 = Object.keys(result)
                    .map((key, value) => ({ date: key, data: result[key] }))
                setData(result2)
                setTimeSlotLoader(false)
            }
            else {
                showMessage({
                    message: 'Something went wrong!',
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'info',
                    backgroundColor: "orange",
                    color: '#fff',
                });
                setTimeSlotLoader(false)

            }
        }
    }, [slotLoader]);

    // Refer
    // https://www.tutorialspoint.com/most-efficient-method-to-groupby-on-an-array-of-objects-in-javascript
    // https://gist.github.com/mikaello/06a76bca33e5d79cdd80c162d7774e9c

    function groupByDate(keys) {
        return function (array) {
            return array.reduce(function (objectsByKeyValue, obj) {
                var value = keys.map(function (key) { return (obj[key]) }).join('-');
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            }, {})
        }
    }
    const getItemCount = (data) => {
        return (Data.length)
    }
    return (
        <ScrollView style={styles.container}>
            {
                TimeSlotLoader ?

                    <View style={{ padding: 15 }}>
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: 15 }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: 15 }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: 15 }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: 15 }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: 15 }} />
                        <ContentLoader active pRows={4} pWidth={["100%"]} containerStyles={{ marginBottom: 15 }} />
                    </View>

                    :
                    <View>
                        {Data.length > 0 ?
                            <VirtualizedList
                                data={Data}
                                initialNumToRender={4}
                                renderItem={({ item, index }) =>
                                    <RenderItem date={item.date} item={item.data} index={index} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                                getItemCount={getItemCount}
                                getItem={((data, index) => data[index])}
                                style={styles.container}
                            /> :
                            <View style={styles.noContentView}>
                                <Icon
                                    name='servicesmenu'
                                    color={'#C6C1C1'}
                                    size={normalize(50)}
                                    config={icoMoonConfigSet}
                                    style={{ marginBottom: heightPercentageToDP(.5) }}
                                />
                                <Text style={styles.noContentStyle}>No TimeSlots</Text>
                            </View>}
                    </View>
            }
        </ScrollView>
    );
}


export default TimeSlots;