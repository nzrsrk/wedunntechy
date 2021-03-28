import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import Modal from 'react-native-modal';
import { MemberProfile } from '../../components/MemberProfile'

import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuTrigger,
    renderers,
    MenuOption,
} from 'react-native-popup-menu';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

const { Popover } = renderers

const Members = [
    {
        name: 'David Robert',
        designation: 'Team Leader',
        order_id: '100002',
        date: '01/01/2020',
        isVisible: false
    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020',
        isVisible: false
    },
    {
        name: 'Syam Mukundan',
        designation: 'Member',
        order_id: '100002',
        date: '01/01/2020',
        isVisible: false
    },

]

export default function MyTeam({ navigation }) {

    const [Modal2Visible, setModal2Visible] = useState(false);
    const [modelDataIndex, setmodalData] = useState(null);
    const [updatedData, setupdatedData] = useState(null);
    const [data, setdata] = useState([]);

    const RemoveMember = (id) => {

        setmodalData(id)
        setModal2Visible(true)
        setPopup(id)
    }
    const confirmRemove = () => {

        let newArray = [...data];
        // setmodalData(id)

        if (modelDataIndex > -1) {
            newArray.splice(modelDataIndex, 1);
        }
        setdata(newArray)
        setModal2Visible(false);
    }
    const setPopup = (id) => {
        let newArray = [...data];
        // setmodalData(id)
        newArray[id].isVisible = !newArray[id].isVisible
        setdata(newArray)
    }
    useEffect(() => {
        setdata(Members)

        // return cleanUp = () => {

        // }
    }, []);

    return (
        <MenuProvider customStyles={{
            backdrop: {
                backgroundColor: 'black',
                opacity: 0.1,
            }
        }} style={[GlobalStyles.container, GlobalStyles.commonPadding]}>
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


            <View style={{}}>

                <View style={[styles.alignVertically, { paddingVertical: heightPercentageToDP(2), }]}>
                    <TouchableOpacity style={[styles.alignVertically,]} onPress={() => navigation.navigate('AddTeam')}>
                        <Icon
                            // style={styles.pic}
                            name='add_user'
                            color={'#37537D'}
                            size={normalize(4.2)}
                            config={icoMoonConfigSet}
                        />

                        <Text style={[GlobalStyles.TextRegularLarge,
                        { color: '#37537D', marginHorizontal: heightPercentageToDP(2), alignSelf: 'center' }]}>Add a member</Text>
                    </TouchableOpacity>

                </View>


                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Menu renderer={Popover}
                            rendererProps={{ anchorStyle: { backgroundColor: Theme.BLUE }, placement: 'top' }} >
                            <MenuTrigger children={
                                <MemberProfile member={item} rightContent={
                                    <Text style={[GlobalStyles.TextSmallRegular, { color: item.designation === 'Member' ? '#37537D' : Theme.GREEN }]}>{item.designation}</Text>
                                }
                                />

                            } />

                            <MenuOptions optionsContainerStyle={[styles.modalContainer, styles.popover]}  >
                                <MenuOption onSelect={() => RemoveMember(index)} >
                                    <Text>Remove {item.name}</Text>
                                </MenuOption>
                            </MenuOptions>

                        </Menu>

                    )}
                />

            </View>
            <ViewConfirmModal Modal2Visible={Modal2Visible}
                setModal2Visible={setModal2Visible}
                confirmRemove={confirmRemove}
                data={data}
                modelDataIndex={modelDataIndex}

            />
        </MenuProvider>
        // </ScrollView>
    );
}



const ViewConfirmModal = ({ Modal2Visible, setModal2Visible, confirmRemove, data, modelDataIndex }) => {

    return (
        <View>
            <Modal isVisible={Modal2Visible}
                onBackdropPress={() => setModal2Visible(false)}
                backdropOpacity={0.10}
                backdropTransitionOutTiming={0}
                animationOut='fadeOut' animationOutTiming={500}
                animationInTiming={500} animationIn='fadeIn'>
                <View style={[styles.triangle]}>
                </View>
                <View style={[styles.modalContainer, styles.modal2Visible]}>
                    <Text>are you sure to remove {data[modelDataIndex]?.name + ' from David Roberts team'}</Text>
                    <View style={[styles.buttonWrapper, { paddingTop: heightPercentageToDP(1) }]}>
                        <Button
                            title="Ok"
                            type='outline'
                            iconRight
                            onPress={() => confirmRemove()}
                            titleStyle={[GlobalStyles.TextSmallRegular, { color: '#37537D', paddingHorizontal: widthPercentageToDP(.5) }]}
                            buttonStyle={[styles.buttonStyles]}
                        />
                        <Button
                            title="Cancel"
                            type='outline'
                            iconRight
                            onPress={() => setModal2Visible(false)}
                            titleStyle={[GlobalStyles.TextSmallRegular, { color: '#37537D', paddingHorizontal: heightPercentageToDP(.5) }]}
                            buttonStyle={[styles.buttonStyles]}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}