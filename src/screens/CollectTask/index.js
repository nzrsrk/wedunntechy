import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import styles from './styles';
import AudioRecorder from './AudioRecorder';
import AudioPlayer from './AudioPlayer';

// import AudioRecord from './AudioRecord';
// import PlayAudio from './PlayAudio';
// import { Audio } from 'expo-av';
import { PhotoPicker } from '../../components/PhotoPicker';
import { Validate } from '../../components/validate';
import { showMessage } from "react-native-flash-message";
import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';
import { FetchCalling, baseURL, FileDeleteService, FileUploadMultipleService } from '../../routes/APICalls';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';
// -------- pending tasks-------------------
//  saving audio  file
//  while adding multiple audios file problem in playback

//  text input field
const Input = (props) => {
    const { inputStyle, placeholderText, onChangeText, value, disabled, errorMessage } = props;
    return (
        <KeyboardAvoidingView >
            <TextInput style={[styles.input,]}
                editable={disabled}
                placeholder={placeholderText}
                placeholderTextColor={"#8D8D8D"}
                onChangeText={onChangeText}
                value={value}
            >
            </TextInput>
            {Boolean(errorMessage) ?
                <Text style={styles.error}>{errorMessage}</Text>
                : null}
        </KeyboardAvoidingView>
    )
}
//  text input field
const Input2 = (props) => {
    const { inputStyle, placeholderText, onChangeText, value, disabled, errorMessage } = props;
    return (
        <KeyboardAvoidingView >
            <TextInput style={[styles.input2,]}
                editable={disabled}
                placeholder={placeholderText}
                placeholderTextColor={"#8D8D8D"}
                onChangeText={onChangeText}
                value={value}
                multiline={true}
                numberOfLines={4}
            >
            </TextInput>
        </KeyboardAvoidingView>
    )
}


export default function OrderTask({ route, navigation }) {

    const [values, setValues] = useState([{
        saved: false, // -> to toggle edit/done 
        val1: '',
        val2: '',
        audio: [],
        image: '',
        Id: 0
    }]);



    // ------- fetch all subtasks when screen loads initially   ---------
    const [CollectTaskData, setCollectTaskData] = useState([]);
    const [TaskLoader, setTaskLoader] = useState(true);

    const collectAllData = async () => {
        let passData = {
            ComplaintId: route.params.details.Id,
            PageIndex: 0,
            PageSize: 0
        }

        let pageFinder = 'getAllSubtask';
        setTaskLoader(true)
        await FetchCalling(passData, setCollectTaskData, setTaskLoader, pageFinder)
    }

    useEffect(() => {
        collectAllData();
        return () => {
            setTaskLoader(true);
        }
    }, []);



    useEffect(() => {
        if (!TaskLoader) {
            if (CollectTaskData.Success) {
                if (CollectTaskData.Data.length != 0) {
                    const taskDetails = CollectTaskData.Data.sort(CollectTaskData.Data.CreateDate).reverse();
                    const SubtaskData = []
                    //  get all subtasks and save them
                    const saveSubtasks = (subtask) => {
                        let List = JSON.parse(subtask?.AttachFileList)
                        let audios = [];
                        List?.length > 0 && List.map((item, index) => {
                            if (item !== null) {
                                if (item?.type === 'audio') {
                                    audios.push(item?.file)
                                }
                            }
                        })
                        const myimage = List?.length > 0 ? List.find(lists => lists?.type === 'image')?.file : '';
                        // const myAudio = List?.length > 0 ? List.find(lists => lists?.type === 'audio')?.file : '';
                        SubtaskData.push({
                            saved: true, // -> to toggle edit/done 
                            val1: subtask.SubTaskName,
                            val2: subtask.Description,
                            audio: audios?.length > 0 ? audios : '',
                            image: myimage ? myimage : '',
                            Id: subtask.Id
                        })

                    }
                    if (taskDetails?.length != 0) {
                        taskDetails?.map((subtask, index) => {
                            if (subtask.length != 0 && subtask.DeletedDate === null) {
                                saveSubtasks(subtask);
                            }
                        })
                        setValues(SubtaskData)

                        // console.log(values)
                    }
                }
            }
        }
    }, [TaskLoader]);
    // -------  end  ---------

    // to append new subtasks
    function CreateInputs() {
        return values.map((el, i) =>
            <View key={i}>
                <SingleTask
                    navigation={navigation}
                    values={values}
                    setValues={setValues}
                    index={i}
                    route={route}
                    collectAllData={collectAllData}
                    Loader={TaskLoader} />
            </View>

        );
    }

    // for dynamiclly add inputs will work only after saving all previous tasks

    const addClick = () => {
        const allsaved = values.filter(element => element.saved).length
        if (allsaved === values.length) {
            const newValues = [...values];
            newValues.push({
                Id: 0,
                saved: false,
                val1: '',
                val2: '',
                audio: [],
                image: '',
                // purchaseList: []
            });
            setValues(newValues);
        }
        else {
            showMessage({
                message: "After saving all Previous task you can add another one",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }




    return (
        <ScrollView style={styles.container} contentContainerStyle={{ position: 'relative' }}>
            {TaskLoader ? <LoaderTwo style={{ marginTop: Theme.SCREEN_HEIGHT / 3 }} /> :
                <View>
                    <View style={[
                        GlobalStyles.commonPadding,
                        {
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingBottom: heightPercentageToDP(2)
                        }]}
                    >
                        <Text style={[GlobalStyles.TextMediumBold,
                        { color: Theme.BLUE }]}>Task</Text>
                        <TouchableOpacity
                            onPress={() => addClick()}
                        >
                            <Icon
                                name={'plus'}
                                color={Theme.BLUE}
                                size={normalize(30)}
                                config={icoMoonConfigSet}
                            />
                        </TouchableOpacity>
                    </View>

                    <CreateInputs />
                </View>

            }
        </ScrollView >
    );

}




const SingleTask = ({ navigation, values, setValues, index, route, collectAllData }) => {
    const [hasFunctionFetching, sethasFunctionFetching] = useState(false);

    // const [purchaseList, setpurchaseList] = useState(route.params.purchaseList);
    const [myfields, setmyFields] = useState({
        Id: values[index].Id,
        val1: values[index].val1,
        val2: values[index].val2,
        // audio: values[index].audio,
    });
    const [audio, setaudio] = useState(values[index].audio);
    const [image, setImage] = useState(values[index].image);
    const [Errors, setErrors] = useState({ val1: '', audio: '', image: '', });

    //   -------- delete  subtask and purchase orders -----------    //

    const [DeleteCollectTask, setDeleteCollectTask] = useState([]);
    const [DeleteCtLoader, setDeleteCtLoader] = useState();

    const DeleteCollectData = async (DeleteId) => {
        let passData = {
            Id: DeleteId,
        }

        let pageFinder = 'DeleteSubTaskList';
        setDeleteCtLoader(true)
        await FetchCalling(passData, setDeleteCollectTask, setDeleteCtLoader, pageFinder)
    }

    // delete existing purchase Orders before Saving
    const [DeletePurchaseData, setDeletePurchaseData] = useState([]);
    const [purchaseDeleteLoader, setpurchaseDeleteLoader] = useState();

    const DeleteExistingPurchaseOrder = async (item) => {
        let pageFinder = "DeletePurchaseOrder";
        let passData = {
            Id: item.Id,
        }
        setpurchaseDeleteLoader(true);
        FetchCalling(passData, setDeletePurchaseData, setpurchaseDeleteLoader, pageFinder);
    }

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!hasFunctionFetching) {
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    '',
                    'Please wait! background task is in progress',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        // {
                        //     text: 'Discard',
                        //     style: 'destructive',
                        //     // If the user confirmed, then we dispatch the action we blocked earlier
                        //     // This will continue the action that had triggered the removal of the screen
                        //     onPress: () => navigation.dispatch(e.data.action),
                        // },
                    ]
                );
            }),
        [navigation, hasFunctionFetching]
    );



    useEffect(() => {

        if (DeleteCtLoader === false) {
            sethasFunctionFetching(false)
            if (DeleteCollectTask.Success) {
                showMessage({
                    message: "Deleted Successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
            }
        }

    }, [DeleteCtLoader]);



    const remove = async (i, taskitem) => {
        sethasFunctionFetching(true)
        if (taskitem.purchaseList?.length != 0) {
            taskitem.purchaseList?.map((item, index) => {
                if (item.length != 0)
                    DeleteExistingPurchaseOrder(item)
            })
        }
        await DeleteCollectData(taskitem.Id)
        const newValues = [...values];
        newValues.splice(i, 1);
        setValues(newValues);
        if (newValues.length === 0)// if there only one subtask after deleting last one add an empty values
            setValues([{
                saved: false, // -> to toggle edit/done 
                val1: '',
                audio: [],
                image: '',
                Id: 0
            }]);

        else {
            setValues(newValues)
        }

    }

    // end delete -----------------------


    const ValidateInputs = async () => {
        let val1Error = Validate('Sub Task Name', 'isEmpty', myfields.val1)
        setErrors({ ...Errors, val1: val1Error })
        if (val1Error === '') {
            return true
        }
        else
            return false
    }

    const onSubmit = async () => {
        const fields = [...values];
        const allsaved = fields.filter(element => element.saved).length
        if ((allsaved === fields.length) && fields[index].saved) {
            fields[index].saved = false
            setValues(fields);
        } else if (!fields[index].saved) {
            let validate = await ValidateInputs();
            if (validate) {
                sethasFunctionFetching(true)
                SaveCollectTask(fields[index]?.audio);
            }
        }
        else {
            showMessage({
                message: "After saving all  task you can Edit another one",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'warning',
                backgroundColor: "orange",
                color: '#fff',
            });
        }
    }
    const [fileupdateData, setfileupdateData] = useState([]);
    const [FileUpdateLoader, setFileUpdateLoader] = useState();

    const SaveCollectTask = async (audiofiles) => {
        setfileupdateData(true)
        sethasFunctionFetching(true)
        if (recorded.length > 0) {
            const formData = new FormData()
            recorded.map((item, index) => {
                const uriParts = item.serveruri.split('.');
                const fileType = uriParts[uriParts.length - 1];
                let files = {
                    // uri: uri,
                    uri: Platform.OS === "android" ? item.serveruri : item.serveruri.replace("file://", ""),
                    name: `${Date.now()}.${fileType}`,
                    type: `audio/${fileType}`,
                    // // as different audio types are used for android and ios - we should handle it
                    // type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
                    // name: Platform.OS === 'ios' ? `${Date.now()}.wav` : `${Date.now()}.m4a`,
                }
                // now we create formData which will be sent to our backend
                formData.append('file', files)

            })

            await FileUploadMultipleService(formData, setfileupdateData, setFileUpdateLoader)
        }
        else {
            let attachList = []
            audiofiles.map((item, index) => {
                attachList.push({
                    file: item,
                    type: 'audio'
                })
            })
            attachList.push({
                file: image,
                type: 'image'
            })
            SaveTask(attachList)
        }

    }

    useEffect(() => {
        if (FileUpdateLoader === false) {
            if (fileupdateData.Success) {
                setrecorded([])
                let attachList = []
                audio.map((item, index) => {
                    attachList.push({
                        file: item,
                        type: 'audio'
                    })
                })
                attachList.push({
                    file: image,
                    type: 'image'
                })
                fileupdateData?.Data?.map((item, index) => {
                    attachList.push({
                        file: item,
                        type: 'audio'
                    })
                })
                SaveTask(attachList)
                // SaveTask()
            }
        }

    }, [FileUpdateLoader]);


    const [CollectTskData, setCollectTskData] = useState([]);
    const [CollectTaskLoader, setCollectTaskLoader] = useState();

    const SaveTask = async (attachList) => {
        let pageFinder = "CreateSubTaskList";
        let passData = {
            Id: myfields.Id,
            OrderId: route.params.details.Id,
            SubTaskName: myfields.val1,
            // TotalPrice: ,
            Description: myfields.val2,
            AttachFileList: JSON.stringify(attachList),
            Status: null,
        }

        // setCollectTaskLoader(true);
        FetchCalling(passData, setCollectTskData, setCollectTaskLoader, pageFinder);
    }



    useEffect(() => {
        const fields = [...values];
        if (CollectTaskLoader == false) {
            sethasFunctionFetching(false)
            if (CollectTskData.Success) {
                fields[index].Id = CollectTskData.Data.Id
                fields[index].saved = true
                fields[index].val1 = CollectTskData.Data.SubTaskName
                fields[index].image = image
                fields[index].audio = audio
                setValues(fields)
                setmyFields({ ...myfields, Id: CollectTskData.Data.Id })
                showMessage({
                    message: "Saved Successfully",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
                collectAllData()
            }
        }
        return () => {

        }

    }, [CollectTaskLoader])




    const [PickerVisible, setPickerVisible] = useState(false);
    const [ImageLoader, setImageLoader] = useState();

    const [recorded, setrecorded] = useState([]);
    return (
        <View style={GlobalStyles.commonPadding}>
            <View style={styles.detailsCard}>
                <View style={[styles.detailsCardInner]}>
                    <View style={[styles.imgWrp]}>
                        <TouchableOpacity disabled={values[index].saved} onPress={() => setPickerVisible(true)}>

                            <View style={{ width: widthPercentageToDP(30), height: heightPercentageToDP(15), borderWidth: 1, borderColor: Theme.GREEN, alignItems: 'center', position: 'relative' }}>
                                {ImageLoader ?
                                    <View style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <LoaderTwo />
                                    </View>
                                    :
                                    <Image
                                        style={{ width: widthPercentageToDP(28), height: heightPercentageToDP(14.5), alignSelf: 'center' }}
                                        source={image ? { uri: baseURL + image } : null}
                                        resizeMode='stretch'
                                    />}
                            </View>

                            <Text style={[styles.title,
                            {
                                color: Theme.DARK_GRAY,
                                fontFamily: "Roboto-Medium",
                                width: '80%',
                                textAlign: 'center',
                                marginTop: heightPercentageToDP(.5),
                                marginBottom: 0
                            }]}
                            >
                                Upload Image
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.imputWrp]}>
                        <Input
                            disabled={!values[index].saved}
                            placeholderText='Sub Task Name'
                            onChangeText={(text) => setmyFields({ ...myfields, val1: text })}
                            value={myfields.val1}
                            errorMessage={Errors.val1}
                        />
                        <Input2
                            disabled={!values[index].saved}
                            placeholderText='Description'
                            onChangeText={(text) => setmyFields({ ...myfields, val2: text })}
                            value={myfields.val2}
                        />
                    </View>
                </View>
                <View style={{ paddingBottom: '5%' }}>
                    {!values[index].saved &&
                        <AudioRecorder
                            audio={recorded}
                            setaudio={setrecorded}
                        />}

                    {audio.length > 0 &&
                        !values[index].saved && <AudioPlayer
                            audios={audio}
                            setaudiofiles={setaudio}
                            SaveCollectTask={SaveCollectTask}
                            sethasFunctionFetching={sethasFunctionFetching}
                        />
                    }
                </View>

            </View>

            <PhotoPicker
                PickerVisible={PickerVisible}
                setPickerVisible={setPickerVisible}
                setImage={setImage}
                image={image}
                sethasFunctionFetching={sethasFunctionFetching}
                imageLoader={ImageLoader}
                setImageLoader={setImageLoader}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: !hasFunctionFetching ? Theme.SECONDARY_COLOR : '#EEEEEE' }]}
                    onPress={() => !hasFunctionFetching && onSubmit()}
                >
                    <Text style={[styles.buttonText]}>
                        {values[index].saved ? 'Edit' : 'Done'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: !hasFunctionFetching ? Theme.PRIMARY_COLOR : '#EEEEEE' }]}
                    onPress={() => !hasFunctionFetching && remove(index, values[index])}
                >
                    <Text style={[styles.buttonText]}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}