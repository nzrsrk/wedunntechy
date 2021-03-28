import React, { useState, useEffect } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FetchCalling } from '../../routes/APICalls';
import Theme from '../../styles/Theme';
import { showMessage } from "react-native-flash-message";


export default function ListDealers({ spid }) {
    const [ServiceReturn, setServiceReturn] = useState([]);
    const [ServiceLoader, setServiceLoader] = useState(false);
    const [DealerData, setDealerData] = useState([]);

    const [ServiceDetails, setServiceDetails] = useState([]);

    const ListDealers = () => {
        setServiceLoader(true);
        let passData = {
            SPId: spid
        };
        let pageFinder = "ListAllDealers"
        FetchCalling(passData, setServiceReturn, setServiceLoader, pageFinder);
    }

    useEffect(async () => {
        let serviceDealers = JSON.parse(await AsyncStorage.getItem('userinfo'))
        setServiceDetails(serviceDealers)
        ListDealers()
        return () => {
        }
    }, []);


    useEffect(() => {
        if (ServiceLoader === false) {
            if (ServiceReturn.Success) {
                setDealerData(ServiceReturn?.Data)
            }
        }

        return () => {

        }
    }, [ServiceLoader]);

    const [Loader, setLoader] = useState();
    const [ReturnData, setReturnData] = useState();


    const UpdateUserData = (userinfo) => {
        let pageFinder = "register";
        let passData = {
            ...userinfo
        }
        setLoader(true);
        FetchCalling(passData, setReturnData, setLoader, pageFinder);
    }

    useEffect(async () => {
        if (Loader === false) {
            if (ReturnData.Success) {
                await AsyncStorage.setItem('userinfo', JSON.stringify(ReturnData.Data));
                setServiceDetails(ReturnData.Data)

                showMessage({
                    message: "updated Dealer Successfully!",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
            }
        }
        return () => {

        }
    }, [Loader]);


    const UpdateDealer = async (item) => {
        let data = await AsyncStorage.getItem('userinfo');
        let userinfo = JSON.parse(data)
        userinfo.DealerId = item.DealerId
        userinfo.NameOfDealer = item.DealerName
        UpdateUserData(userinfo)
    }


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.txt}>Select Dealer - </Text>
                    <Text style={styles.dealertxt}>{ServiceDetails.NameOfDealer}</Text>
                </View>
            </View>
            <ScrollView style={{ paddingVertical: '5%' }}>
                {DealerData?.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.list} key={index} onPress={() => UpdateDealer(item)} >
                            <Text style={styles.dealertxt}>{item?.DealerName}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({


    container: {
        flex: 1,
        // backgroundColor: Theme.GREEN,
        paddingVertical: '5%',
    },
    textContainer: {
        width: '100%',
        borderColor: 'grey',
        borderBottomWidth: 1,
        borderTopWidth: 1
        // color: Theme.GREEN
        // backgroundColor: Theme.GREEN,
        // borderWidth: 1,
        // borderColor: Theme.BLUE
        // height: 35
    },
    txt: {
        fontSize: Theme.FONT_SIZE_EXTRA_LARGE,
        color: Theme.GREEN,
        fontFamily: 'Roboto-Bold',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: '1%'
    },
    dealertxt: {
        fontSize: Theme.FONT_SIZE_MEDIUM,
        color: Theme.BLUE,
        // fontFamily: 'Roboto-Bold'
    },
    list: {
        // borderColor: 'grey',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        alignSelf: 'center'
    }



})