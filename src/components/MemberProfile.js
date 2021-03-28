import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

import { Icon, icoMoonConfigSet } from '../styles/Icons';




export const MemberProfile = ({ member, rightContent }) => {
    return (
        <View style={[styles.alignVertically, { paddingVertical: 20, }]}>
            <View style={styles.alignVertically}>
                <Icon
                    // style={styles.pic}
                    name='user_2'
                    color={'#37537D'}
                    size={42}
                    config={icoMoonConfigSet}
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={[GlobalStyles.TextRegularLarge, { color: '#37537D' }]}>{member.name}</Text>
                    <Text style={[GlobalStyles.TextSmallRegular, { color: '#37537D' }]}>{member.order_id}</Text>
                    <Text style={[GlobalStyles.TextSmallRegular, { color: '#37537D' }]}>Member since {member.date}</Text>
                </View>
            </View>
            {rightContent}
        </View >
    )
}




const styles = StyleSheet.create({

    alignVertically: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },



})

