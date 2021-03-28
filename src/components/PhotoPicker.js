import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import { normalize } from './Normalize'


// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import { FileUploadService, FileDeleteService } from '../routes/APICalls';
import Theme from '../styles/Theme';
import ImagePicker from 'react-native-image-crop-picker';

export function PhotoPicker(props) {
    const { PickerVisible,
        setPickerVisible,
        setImage,
        image,
        setImageLoader,
        sethasFunctionFetching } = props;
    const [UploadLoader, setUploadLoader] = useState();
    const [ReturnData1, setReturnData1] = useState([]);
    const UploadImage = async (url) => {
        setImageLoader(true)
        sethasFunctionFetching(true)
        await _removeImage()  // -> if image? remove first
        setImage('')
        const formData = new FormData();
        let fileType = url.substring(url.lastIndexOf(".") + 1);
        formData.append('file', {
            uri: Platform.OS === "android" ? url : url.replace("file://", ""),
            type: `image/${fileType}`,
            name: `image.${fileType}`
        });
        setUploadLoader(true);

        await FileUploadService(formData, setReturnData1, setUploadLoader) // -> service for file uploading 
    }
    useEffect(() => {
        console.log(PickerVisible)

        return () => {

        }
    }, []);

    useEffect(() => {
        if (UploadLoader === false) {
            sethasFunctionFetching(false)
            if (ReturnData1.Success) {
                setImage(ReturnData1?.Data)
                setImageLoader(false)
            } else {
                setImageLoader(false)

            }
        }

    }, [UploadLoader]);

    const [deleteLoader, setdeleteLoader] = useState();
    const [deletedData, setdeletedData] = useState([]);

    const _removeImage = async () => {
        if (image != '') {
            var raw = JSON.stringify({ "OldName": image });
            await FileDeleteService(raw, setdeletedData, setdeleteLoader) // -> service for file deleting 
        }
    }
    useEffect(() => {
        if (deleteLoader === false) {
            if (deletedData.Success) {
                setImage('')
            }
        }
    }, [deleteLoader]);

    const _takePhoto = async () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            UploadImage(image.path)
            setPickerVisible(false)
        })
            .catch((e) => {
                console.log(e);
            });



    }

    const _pickImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(async image => {
            UploadImage(image.path)
            setPickerVisible(false)
        })
            .catch((e) => {
                console.log(e);
            });

    };

    return (
        <Modal isVisible={PickerVisible}
            onBackdropPress={() => setPickerVisible(false)}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            animationOut='fadeOut'
            animationOutTiming={500}
            animationInTiming={500}
            animationIn='fadeIn'>
            <View style={styles.modalStyle}>
                <Text style={styles.text1}>Select Image</Text>
                <TouchableOpacity onPress={() => _takePhoto()}>
                    <Text style={styles.text2}>Take Photo.....</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _pickImage()}>
                    <Text style={styles.text2}>Choose from Library...</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ alignSelf: 'flex-end', }}>
                    <Text style={styles.text3}>Cancel</Text>
                </TouchableOpacity> */}
            </View>
        </Modal>
    )

}


const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: '#fff',
        height: '25%',
        width: '80%',
        alignSelf: 'center',
        padding: heightPercentageToDP(2)
    },
    text1: {
        fontSize: Theme.FONT_SEVENTEEN,
        fontFamily: 'Roboto-Bold',
        // color: Theme.BLUE,
        paddingBottom: heightPercentageToDP(2)
    },
    text2: {
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Roboto-Light',
        paddingBottom: heightPercentageToDP(2)
    },
    text3: {
        fontSize: Theme.FONT_FIFTEEN,
        fontFamily: 'Roboto-Medium',
        paddingBottom: heightPercentageToDP(2)
    }



})