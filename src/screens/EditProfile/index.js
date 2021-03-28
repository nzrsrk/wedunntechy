import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Theme from '../../styles/Theme'
import styles from './styles'
import GlobalStyles from '../../styles/GlobalStyles';

import { Button } from 'react-native-elements';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import { AppButton } from '../../components/AppButton';

import Accordion from 'react-native-collapsible/Accordion';


// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
// import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";

import { showMessage } from "react-native-flash-message";


import { PersonalDetails } from './personalDetails';
import { BankDetails } from './bankDetails';
import { GeneralDetails } from './generalDetails';
import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';
import { FetchCalling, baseURL } from '../../routes/APICalls';
import { FileUploadService, FileDeleteService } from '../../routes/APICalls';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';
import ImagePicker from 'react-native-image-crop-picker';

//  Accordian Sections
const SECTIONS = [
    {
        title: 'General Details',
    },
    {
        title: 'Bank Details',
    },

    {
        title: 'Personal Details',
    },
];


function ProfileImageModal({ visibleModal, setvisibleModal, setimage, image, setImageLoader, ImageLoader }) {
    const [returnData1, setReturnData1] = useState([]); // -> Profile Image Upload Return Data
    const [uploadLoader, setUploadLoader] = useState(); // -> Profile Image Upload Loader
    const [deleteData, setdeleteData] = useState([]); // -> Profile Image Delete retundata
    const [deleteLoader, setdeleteLoader] = useState(); // -> Profile Image Delete Loader

    //  ask permission for gallery access
    useEffect(() => {
        // getPermissionAsync();
    }, []);


    // const getPermissionAsync = async () => {
    //     if (Platform.OS === 'ios') {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // };

    // function triggered while Profile Image Uploaded

    const _pickImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(async image => {
            setImageLoader(true)
            await _removeImage()  // -> if image? remove first
            const formData = new FormData();
            let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
            let fileType = image.path.substring(image.path.lastIndexOf(".") + 1);
            console.log(fileType);
            formData.append('file', {
                uri: Platform.OS === "android" ? image.path : image.path.replace("file://", ""),
                type: `image/${fileType}`,
                name: `image.${fileType}`
            });
            // console.log(formData)
            setUploadLoader(true)
            await FileUploadService(formData, setReturnData1, setUploadLoader) // -> service for file uploading 
        });
    }


    // after file upload  save image in image state and update in create service Person api(register)
    useEffect(() => {
        if (uploadLoader === false) {
            if (returnData1.Success) {
                setimage(baseURL + returnData1.Data)
                UpdateProfile(baseURL + returnData1.Data)
            }
            setImageLoader(false)
            setvisibleModal(false)
        }
    }, [uploadLoader]);


    const randerIcon = (icon) => {
        return (
            <View style={styles.modalIcon}>
                <Icon
                    name={icon}
                    color={Theme.BLUE}
                    size={normalize(30)}
                    config={icoMoonConfigSet}
                />
            </View>
        )
    }

    // for delete image and update in create service Person api(register)
    const _deleteImage = async () => {
        await UpdateProfile(null)
        _removeImage()
    }

    //to avoid unneccessary repeated api calls

    const _removeImage = async () => {
        if (image !== null) {
            var raw = JSON.stringify({ "OldName": image.replace(baseURL, "") });
            await FileDeleteService(raw, setdeleteData, setdeleteLoader) // -> service for file deleting 
        } else {
            setimage(null)
            setvisibleModal(false)
        }
    }
    useEffect(() => {
        if (deleteLoader === false) {
            if (deleteData.Success) {
                setimage(null)
            }
        }
        setvisibleModal(false)
    }, [deleteLoader]);



    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);

    const UpdateProfile = async (data) => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'))
        let passData = { Image: data, Id: details.Id, Mobile: details.Mobile }

        let pageFinder = 'register';

        setLoader(true);
        FetchCalling(passData, setReturnData, setLoader, pageFinder)
    }

    useEffect(() => {
        if (loader == false) {
            if (returnData.Success) {
                userStoreData();
                showMessage({
                    message: "Profile Image Updated successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
            }
        }
    }, [loader]);

    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    const userStoreData = async () => {
        try {
            let clearstorage = await removeItemValue('userinfo');
            if (clearstorage)
                await AsyncStorage.setItem('userinfo', JSON.stringify(returnData.Data));
        } catch (e) {
            showMessage({
                message: e,
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'info',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }
    const renderProfilePickerContent = () => (
        <View style={styles.modalContent}>
            <Text style={styles.bottomModelTitle}>Profile Photo</Text>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ alignItems: 'center', paddingHorizontal: heightPercentageToDP(2), }}>
                    <Button
                        onPress={() => _deleteImage()}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        icon={
                            randerIcon('delete',)} />
                    <Text style={styles.modalButtonLabels}> Remove Photo</Text>
                </View>
                <View style={{ alignItems: 'center', paddingHorizontal: heightPercentageToDP(2) }}>
                    <Button
                        onPress={() => _pickImage()}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        icon={
                            randerIcon('edit')}
                    />
                    <Text style={styles.modalButtonLabels}>Gallery</Text>
                </View>
            </View>
        </View>
    );

    return (
        <Modal
            onBackButtonPress={() => setvisibleModal(false)}
            onBackdropPress={() => setvisibleModal(false)}
            isVisible={visibleModal}
            backdropTransitionOutTiming={0}
            style={styles.bottomModal}>
            {renderProfilePickerContent()}
        </Modal>
    )
}



export default function Profile({ navigation }) {

    // set the active screen

    const [activeSection, setactiveSection] = useState([0]);
    const personalDetailsRef = useRef();
    const bankRef = useRef();
    const generalRef = useRef();
    const [ProfilePicker, setProfilePicker] = useState(false);
    const [image, setimage] = useState();
    const [ImageLoader, setImageLoader] = useState(true);
    const getProfilePic = async () => {
        let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
        setimage(details?.Image)
        setImageLoader(false)
        // console.log(details?.Image)
    }

    useEffect(() => {
        getProfilePic()
    }, []);



    const validateForm = () => {
        if (generalRef.current.ValidateGeneral())
            showMessage({
                message: "Error! Please Check the General Details",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
        else if (bankRef.current.ValidateBank())
            showMessage({
                message: "Error! Please Check the Bank Details",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
        else if (personalDetailsRef.current.Validate()) // if error in personal details return true
            showMessage({
                message: "Error! Please Check the Personal Details",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
        else {
            return true
        }

        return false
    }



    const [loader, setLoader] = useState();
    const [returnData, setReturnData] = useState([]);

    const SubmitForm = async () => {
        const validate = await validateForm();
        if (validate) {
            let generaldetails = generalRef.current.GeneralData();
            let bankDetails = bankRef.current.BankData();
            let personalDetails = personalDetailsRef.current.PersonalData();
            let passData = { ...generaldetails, ...bankDetails, ...personalDetails, Image: image }
            // console.log(passData)
            // let passData = {
            //     FirstName: generaldetails.FirstName,
            //     IdCardCopy: generaldetails.IdCardCopy,
            //     IdCardNo: generaldetails.IdCardNo,
            //     Mobile: generaldetails.Mobile,
            //     Email: generaldetails.Email,
            //     OfferService: generaldetails.OfferService,

            //     NameOfBanker: bankDetails.NameOfBanker,
            //     NameOfOrg: bankDetails.NameOfOrg,
            //     BranchName: bankDetails.BranchName,
            //     MICRCode: bankDetails.MICRCode,
            //     BankAccountNo: bankDetails.BankAccountNo,
            //     IFSCCode: bankDetails.IFSCCode,
            //     City: bankDetails.City,

            //     Id: personalDetails.Id,
            //     NameOfDealer: personalDetails.NameOfDealer,
            //     DateOfBirth: personalDetails.DateOfBirth,
            //     HouseName: personalDetails.HouseName,
            //     CityTown: personalDetails.CityTown,
            //     District: personalDetails.District,
            //     State: personalDetails.State,
            //     Pincode: personalDetails.Pincode,
            //     StreetAddress: personalDetails.StreetAddress
            // }
            let pageFinder = 'register';

            setLoader(true);
            FetchCalling(passData, setReturnData, setLoader, pageFinder)
        }
    }

    useEffect(() => {
        if (loader == false) {
            if (returnData.Success) {
                userStoreData('nav');
                showMessage({
                    message: "Profile Updated successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
                // navigation.navigate('ProfileFillView');
            }
        }
    }, [loader]);

    const removeItemValue = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    const userStoreData = async (val) => {
        try {
            let clearstorage = await removeItemValue('userinfo');

            if (clearstorage)
                await AsyncStorage.setItem('userinfo', JSON.stringify(returnData.Data));

            let userDataCollected = await AsyncStorage.getItem('userinfo');

            if (userDataCollected && val)
                navigation.navigate('ProfileFillView');

        } catch (e) {
            showMessage({
                message: e,
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'info',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }


    const _renderHeader = (section, index, isActive,) => {
        return (
            <View style={[styles.collapseHeaderStyle, { backgroundColor: (isActive) ? Theme.BLUE : '#4D7AA2' }]} >
                <Text style={[GlobalStyles.TextBoldLarge, styles.collapseTitle]}>{section.title}</Text>
                <Icon
                    style={{ transform: (isActive) ? [{ rotate: '0deg' }] : [{ rotate: '270deg' }] }}
                    name='downarrow'
                    color={Theme.WHITE}
                    size={16}
                    config={icoMoonConfigSet}
                />
            </View>

        );
    };
    const _renderContent = (section, index, isActive, sections) => {

        switch (index) {
            case 0:
                return (
                    <GeneralDetails setactiveSection={setactiveSection} ref={generalRef} />
                )
                break;
            case 1:
                return (
                    <BankDetails setactiveSection={setactiveSection} ref={bankRef} />
                )
                break;
            case 2:
                return (
                    <PersonalDetails setactiveSection={setactiveSection} ref={personalDetailsRef} />
                )
                break;
        }
    };
    const _updateSections = (activeSections) => {
        setactiveSection(activeSections);
    };

    return (

        <ScrollView style={styles.container}>
            <LoaderOne loader={loader} />
            <View style={styles.imageWrapper}>

                <TouchableOpacity style={styles.imageContainer} onPress={() => setProfilePicker(true)}>
                    {ImageLoader ? <LoaderTwo /> :
                        <Image
                            style={styles.image}
                            source={image ? { uri: image } : require('../../assets/images/others/FakeDP.png')}
                        />}
                </TouchableOpacity>
            </View>
            <ProfileImageModal
                visibleModal={ProfilePicker}
                setvisibleModal={setProfilePicker}
                setimage={setimage}
                image={image}
                ImageLoader={ImageLoader}
                setImageLoader={setImageLoader} />
            <View style={GlobalStyles.commonPaddingH}>
                <Accordion
                    sectionContainerStyle={{ marginBottom: heightPercentageToDP(.5) }}
                    sections={SECTIONS}
                    activeSections={activeSection}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                />
            </View>

            <View style={[GlobalStyles.commonPaddingH]}>
                <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN, marginTop: heightPercentageToDP(2), }}
                    onPress={() => SubmitForm()} title='Update & Save' />
                <View style={{ flexDirection: 'row', ...GlobalStyles.commonPadding }}>
                    <Text style={{ ...GlobalStyles.TextRegularLarge, color: Theme.BLUE, }}>Declaration</Text>
                    <Text style={{ color: Theme.DARK_RED }}>*</Text>
                </View>
                <Text style={[{ paddingBottom: heightPercentageToDP(2), }, GlobalStyles.commonPaddingH, GlobalStyles.TextMediumRegular]}>I confirm that, the information furnished above is correct to the best of my knowledge and belief. </Text>
            </View>
        </ScrollView >
    );
}





