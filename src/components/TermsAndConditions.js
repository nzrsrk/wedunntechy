import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Theme from '../styles/Theme';

export const TermsAndConditions = ({ navigation }) => {

    return (
        <View style={styles.Items}>
            <Text style={[styles.text]}
                onPress={
                    () => navigation.navigate('TermsAndConditions', { statusBarIdenti: 'no' })
                }>
                {'Terms & Conditions'}
            </Text>

            <Text style={[styles.text]}
                onPress={() => navigation.navigate('PrivacyPolicy', { statusBarIdenti: 'no' })}>Privacy Policy</Text>
        </View>
    )
}



const styles = StyleSheet.create({

    Items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center'
    },
    text: {
        color: '#929292',
        fontSize: Theme.FONT_SIZE_SMALL,
        fontFamily: "Roboto-Regular"
    }
})
