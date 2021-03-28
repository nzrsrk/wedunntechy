import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements';

import Typography from '../../styles/Typography';
import styles from './styles';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import { MemberProfile } from '../../components/MemberProfile'
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

const Members = [
    {
        name: 'David Robert',
        designation: 'Team Leader',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Sundar',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Sundar',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Sundar',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Sundar',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020'
    },

]



export default function AddTeam({ navigation }) {


    const [data, setdata] = useState([]);
    const [dataBackup, setdataBackup] = useState([]);


    const setSearchText = (name) => {
        let searchText = name;
        let newdata = dataBackup;
        searchText = searchText.trim().toLowerCase();
        newdata = newdata.filter(l => {
            return l.name.toLowerCase().match(searchText);
        });
        setdata(newdata)

    }

    useEffect(() => {
        setdata(Members)
        setdataBackup(Members)

        // return cleanUp = () => {

        // }
    }, []);

    return (
        <ScrollView style={[GlobalStyles.container, GlobalStyles.commonPadding]}>

            <View style={styles.wrapper1}>

                <View style={[styles.alignVertically, { alignItems: 'center' }]}>

                    <Text style={[GlobalStyles.TextMediumBold, { color: Theme.BLUE }]}>David Robert's Team</Text>

                    <View style={styles.buttonWrapper}>
                        <Button
                            icon={
                                <Icon
                                    name='edit_1'
                                    color={Theme.DARK_RED}
                                    size={normalize(18)}
                                    config={icoMoonConfigSet}
                                />
                            }
                            title="Edit"
                            type='outline'
                            iconRight
                            onPress={() => navigation.navigate('MyTeam')}
                            titleStyle={[GlobalStyles.TextSmallRegular, { color: '#37537D', paddingHorizontal: widthPercentageToDP(.5) }]}
                            buttonStyle={[styles.buttonStyles]}
                        />

                        <Button
                            icon={
                                <Icon
                                    name='delete'
                                    color={Theme.DARK_RED}
                                    size={normalize(18)}
                                    config={icoMoonConfigSet}
                                />
                            }
                            title="Delete"
                            type='outline'
                            iconRight
                            onPress={() => navigation.navigate('MyTeam')}
                            titleStyle={[GlobalStyles.TextSmallRegular, { color: '#37537D', paddingHorizontal: widthPercentageToDP(.5) }]}
                            buttonStyle={[styles.buttonStyles]}
                        />
                    </View>

                </View>

                <View style={[GlobalStyles.commonPaddingV]}>
                    <Text style={[GlobalStyles.TextSmallBold, { paddingVertical: heightPercentageToDP(1) }]}>Created on 01/01/2020</Text>
                    <Text style={[GlobalStyles.TextSmallBold, { paddingBottom: heightPercentageToDP(1) }]}>Order Id: 100002</Text>
                </View>

            </View>

            <View style={styles.wrapper2}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Search"
                        underlineColorAndroid='transparent'
                        onChangeText={(value) => setSearchText(value)}
                    />
                    <Icon
                        name='search'
                        color={Theme.GREEN}
                        size={normalize(20)}
                        config={icoMoonConfigSet}
                    />
                </View>

                {data.map((member, index) => {
                    return (
                        <MemberProfile key={index} member={member} rightContent={
                            <Button
                                title="Add"
                                type='outline'
                                onPress={() => navigation.navigate('MyTeam')}
                                titleStyle={[GlobalStyles.TextSmallRegular, { color: '#37537D', paddingHorizontal: widthPercentageToDP(.5) }]}
                                buttonStyle={[styles.buttonStyles, Typography.elevation, { borderColor: Theme.GREEN, marginRight: 0 }]}
                            />}
                        />
                    )
                })}
            </View>

        </ScrollView>
    );
}



