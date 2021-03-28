import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles';
import { AppTopScreenTheme } from '../../components/AppTopScreenTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TermsAndConditions } from '../../components/TermsAndConditions';
import Typography from '../../styles/Typography';
import ListDealer from './ListDealer';
import { StyleSheet } from 'react-native';

const Verification = ({ navigation }) => {
    const [serviceid, setserviceid] = useState();
    useEffect(async () => {
        let data = await AsyncStorage.getItem('userinfo')
        setserviceid(JSON.parse(data).Id)
        return () => {
        }

    }, []);
    return (
        <SafeAreaView style={[Typography.container]}>
            <ScrollView contentContainerStyle={[Typography.commonWrapper]}>

                <AppTopScreenTheme
                    navigation={navigation}
                    image={require('../../assets/images/beforelogin/adminVerification.png')}
                />

                <View style={styles.formContainer}>
                    <Text style={styles.title}>
                        Not Verified by Admin
                    </Text>
                    <ListDealer spid={serviceid} />
                    {/* <Text style={styles.content}>
                        Please make sure that your profile is completed
                    </Text> */}
                </View>
                <View style={Typography.bottomContainer}>
                    <TermsAndConditions navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Verification;


