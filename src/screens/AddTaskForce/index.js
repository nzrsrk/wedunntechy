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

import styles from './styles';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import { MemberProfile } from '../../components/MemberProfile'
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize'

const Members = [
    {
        name: 'David Robert',
        designation: 'Team Leader',
        order_id: '100002',
        date: '01/01/2020',
        status: ''
    },
    {
        name: 'Syam Sundar',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020',
        status: 'R'

    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020',
        status: 'A'

    },
    {
        name: 'Syam Sundar',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020',
        status: 'W'

    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020',
        status: 'W'

    },
]




export default function AddTeam({ navigation }) {


    const [data, setdata] = useState([]);
    const [dataBackup, setdataBackup] = useState([]);
    //status  - W -> waiting,A-> accepted,R->rejected

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
        <ScrollView style={GlobalStyles.container}>
            <View style={[GlobalStyles.commonPadding]}>

                <Text style={[GlobalStyles.TextMediumBold, { color: Theme.BLUE, paddingBottom: heightPercentageToDP(3.0) }]}>Task Force</Text>

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
                            <SingleMember member={member} key={index} />
                        )
                    })}
                </View >


                <Button
                    title="OK"
                    titleStyle={[GlobalStyles.TextBoldLarge]}
                    buttonStyle={[styles.buttonStyle, styles.button2]}
                    onPress={() => navigation.goBack()}
                />

            </View>

        </ScrollView >

    );
}



const SingleMember = ({ member }) => {
    return (
        <MemberProfile member={member} rightContent=
            {
                <View style={{ justifyContent: 'space-between' }}>
                    <Button
                        title={Boolean(member.status) ? "Cancel Service Request" : "Send Service Request"}
                        type='outline'
                        // onPress={() => Boolean(member.status) ?cancel():Send() }
                        titleStyle={[GlobalStyles.TextSmallRegular, { color: '#616161', fontSize: Theme.FONT_ELEVEN }]}
                        buttonStyle={[styles.buttonStyles, { borderColor: Theme.GREEN }]}
                    />
                    {member.status === 'W' ?
                        < Text style={[GlobalStyles.TextSmallRegular, styles.statusText]}>Waiting</Text>
                        : null}
                    {member.status === 'A' ?
                        < Text style={[GlobalStyles.TextSmallRegular, styles.statusText]}>Accepted</Text>

                        : null}
                    {member.status === 'R' ?
                        < Text style={[GlobalStyles.TextSmallRegular, styles.statusText]}>Rejected</Text>

                        : null}

                </View>}
        />
    )
}