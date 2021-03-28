import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Button, } from 'react-native-elements';

import styles from './styles';
import Theme from '../../styles/Theme';
import GlobalStyles from '../../styles/GlobalStyles';

import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import Modal from 'react-native-modal';


import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';

// import PlayAudio from '../CollectTask/PlayAudio';
// import { Audio } from 'expo-av';

import { showMessage } from "react-native-flash-message";


import {
    useFocusEffect,
} from '@react-navigation/native';


import { FetchCalling, baseURL } from '../../routes/APICalls';
import { LoaderOne, LoaderTwo } from '../../components/CustomLoader';
import OTPModal from './SendOTP';

import { MapViewBlock } from '../../components/MapViewBlock';

import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

export default function OrderDetails({ route, navigation }) {


    const { order_details, screen } = route.params;
    const [ModalVisible, setModalVisible] = useState(false);

    const [activeSection, setactiveSection] = useState([0]);

    const [orderStatus, setOrderStatus] = useState('T')
    // T - collect task
    // NA  -not Approved/waiting for approval
    //  A-approved /waiting approval from admin
    //  P -proceeded

    // console.log(order_details);

    const [acceptData, setAcceptData] = useState([]);
    const [acceptLoader, setAcceptLoader] = useState(false);
    useFocusEffect(
        React.useCallback(() => {

            // console.log(order_details);
            const collectAllData = async () => {
                let passData = {
                    ComplaintId: order_details.Id,
                    PageIndex: 0,
                    PageSize: 0
                }

                let pageFinder = 'getAllSubtask';
                setAcceptLoader(true);
                await FetchCalling(passData, setAcceptData, setAcceptLoader, pageFinder);
            }
            collectAllData();

            return () => {
                setAcceptLoader(true);
                setAcceptData([])
            }

        }, [])
    );



    useEffect(() => {
        const status = order_details.Step
        if (acceptLoader == false) {

            if (acceptData.TotalCount == 0) {
                setOrderStatus('T');
            }
            setOrderStatus(status);



            // console.log(acceptData);
        }
    }, [acceptLoader])







    const _renderHeader = (task) => {
        return (
            <View style={[styles.Btn, { paddingHorizontal: heightPercentageToDP(2), paddingTop: heightPercentageToDP(1) }]}>
                <View style={{ flexDirection: 'row', }}>
                    <Icon
                        name={'attach'}
                        color={Theme.BLUE}
                        size={normalize(20)}
                        config={icoMoonConfigSet}
                    />
                    <Text style={[styles.btnText, { width: '80%' }]}>{task.SubTaskName}</Text>
                </View>
                <Icon
                    name={'downarrow'}
                    color={Theme.BLUE}
                    size={normalize(20)}
                    config={icoMoonConfigSet}
                />
            </View>
            // </TouchableOpacity>
        );
    };




    const _renderContent = (task, index) => {
        const List = Boolean(task?.AttachFileList) && JSON.parse(task?.AttachFileList)
        const myimage = List?.length > 0 ? List.find(lists => lists?.type === 'image')?.file : '';
        // const myaudio = List?.length > 0 ? List.find(lists => lists?.type === 'audio')?.file : '';
        // console.log(baseURL + myaudio)

        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: widthPercentageToDP(2) }}>
                {(myimage != '') &&
                    <Image
                        style={{ width: '25%', height: heightPercentageToDP(7), borderWidth: 1, borderColor: Theme.GREEN, backgroundColor: Theme.GRAY_OPACITY }}
                        source={(myimage) ? { uri: baseURL + myimage } : null}
                        resizeMode='contain'
                    />}
                <View style={{ paddingLeft: heightPercentageToDP(2), width: 'auto', flex: 2 }}>
                    {Boolean(task?.Description) && <View style={{ padding: widthPercentageToDP(.5) }}>
                        {/* <Text style={[styles.taskContent, { fontWeight: 'bold', color: Theme.BLUE, flexWrap: 'wrap', flexDirection: 'row', }]}>
                            Description:</Text> */}
                        <Text style={[styles.taskContent, { textAlign: 'justify' }]}>{task?.Description}</Text>
                    </View>}
                    {/* {(myaudio != '') &&
                        <View style={{ paddingBottom: 15 }}>
                            <PlayAudio
                                index={index}
                                fileUrl={baseURL + myaudio}
                                playbackInstance={new Audio.Sound()}
                            />
                        </View>} */}
                    <View>
                        {task?.PurchaseOrder?.length > 0 &&
                            <View style={{ padding: widthPercentageToDP(.5) }}>
                                <Text style={[styles.taskContent, { fontWeight: 'bold', color: Theme.BLUE, flexWrap: 'wrap', flexDirection: 'row', }]}>
                                    Parts Needed</Text>
                                {(task?.PurchaseOrder).map((item, index) => {
                                    return (

                                        <View key={index}>
                                            {index === 0 &&
                                                <View style={[{ backgroundColor: '#E8E8E8', flexDirection: 'row', borderWidth: 1, borderColor: 'black' }]}>
                                                    <View style={[styles.itemsContainer, { flex: 1, borderLeftWidth: 0, }]}>
                                                        <Text style={[styles.items]}>Sl No</Text>
                                                    </View>
                                                    <View style={[styles.itemsContainer, { flex: 4, }]}>
                                                        <Text style={[styles.items]}>Items</Text>
                                                    </View>
                                                    <View style={[styles.itemsContainer, { flex: 2, borderRightWidth: 0, }]}>
                                                        <Text style={[styles.items,]}>Qty</Text>
                                                    </View>
                                                </View>}
                                            <View key={index} style={{
                                                flexDirection: 'row',
                                                borderBottomWidth: 1,
                                                borderColor: 'rgba(0, 0, 0, 0.2)',
                                            }}>
                                                <View style={[styles.itemsContainer, { flex: 1, borderLeftWidth: 1, }]}>
                                                    <Text style={[styles.items,]}>{index + 1}</Text>
                                                </View>
                                                <View style={[styles.itemsContainer, { flex: 4, }]}>
                                                    <Text style={[styles.items]}>{item.Items}</Text>
                                                </View>
                                                <View style={[styles.itemsContainer, { flex: 2, }]}>
                                                    <Text style={[styles.items]}>{item.Quantity}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                                }
                            </View>}
                        {orderStatus === '2' &&
                            <View style={{ justifyContent: 'center', paddingVertical: heightPercentageToDP(1) }}>
                                <TouchableOpacity style={{ backgroundColor: Theme.GREEN, borderRadius: 5 }}
                                    onPress={() => navigation.navigate('ProductDetails', { details: order_details, task: task })}>
                                    <Text style={[{ padding: widthPercentageToDP(1.5), color: '#fff', alignSelf: 'center', fontSize: Theme.FONT_SIZE_SMALL, fontFamily: 'Roboto-Bold' }]}>
                                        Add/Edit Purchase List </Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                </View >

                {/* {orderStatus === 'P' &&
                    <View style={{ justifyContent: 'flex-end', }}>
                        <Icon
                            name={'tick'}
                            color={Theme.BLUE}
                            size={25}
                            config={icoMoonConfigSet}
                        />
                    </View>

                } */}
            </View >
        );
    };

    const _updateSections = (activeSections) => {
        setactiveSection(activeSections);
    };


    const [stepUpdate, setStepUpdate] = useState([]);
    const [stepUpdateLoader, setStepUpdateLoader] = useState(null);

    const [stepUpdate10, setStepUpdate10] = useState([]);
    const [stepUpdateLoader10, setStepUpdateLoader10] = useState(null);

    const stepUpdation = async (status, step, date) => {
        setStepUpdate(null);
        setStepUpdate10(null);


        let statuslist = JSON.parse((order_details.StatusList));


        statuslist.push(
            {
                Date: moment(new Date()).format('dddd, MMMM DD, YYYY, hh:mm:ss A'),
                Status: status
            }
        )
        let passData = {
            Id: order_details.Id,
            Step: step,
            StatusList: Boolean(statuslist) && JSON.stringify(statuslist),
            LastStatus: status,
        }

        let pageFinder = 'stepUpdation';

        if (step.toString() == '10') {
            setStepUpdateLoader10(true);
            await FetchCalling(passData, setStepUpdate10, setStepUpdateLoader10, pageFinder);
        }
        else {
            setStepUpdateLoader(true);
            await FetchCalling(passData, setStepUpdate, setStepUpdateLoader, pageFinder);
        }
    }

    const [updateDate, setUpdateDate] = useState([]);
    const [UpdateLoader, setUpdateLoader] = useState(false);

    const UpdateTime = async (step) => {
        let pageFinder = 'UpdateDate';
        if (step.toString() === '9') {
            let passData = {
                ComplaintId: order_details.Id,
                Type: "Start",
            }
            setUpdateDate([])
            setUpdateLoader(true);
            await FetchCalling(passData, setUpdateDate, setUpdateLoader, pageFinder);
        }
        else if (step.toString() === '10') {
            let passData = {
                ComplaintId: order_details.Id,
                Type: "End",
            }
            setUpdateDate([])
            setUpdateLoader(true);
            await FetchCalling(passData, setUpdateDate, setUpdateLoader, pageFinder);
        }

    }


    useEffect(() => {
        if (stepUpdateLoader == false) {
            if (stepUpdate.Success == true) {
                // console.log(stepUpdate?.Data?.Step)
                UpdateTime(stepUpdate?.Data?.Step)
                setTimeout(() => {
                    navigation.navigate('MyOrderStackNav', {
                        screen: 'MyOrder'
                    });
                }, 1000);

            }
        }
    }, [stepUpdateLoader]);




    const collectTask = () => {
        navigation.navigate('OrderTask', { details: order_details, purchaseList: [] });
    }


    const sendApproval = () => {
        stepUpdation('Waiting For Dealer', 3)
        setOrderStatus('3');
        showMessage({
            message: "Service Request Approved",
            type: "default",
            floating: true,
            position: 'bottom',
            icon: 'success',
            backgroundColor: "green",
            color: '#fff',
        });
    }
    const [PaymentLoader, setPaymentLoader] = useState();
    const [PaymentData, setPaymentData] = useState([]);


    const proceed = async () => {
        stepUpdation('Service Complete', 10);
        setOrderStatus('10')
        collectComplaintDetails();
    }

    const validateOtp = async () => {
        setReset(true);
    }


    const [complaintDetails, setComplaintDetails] = useState([]);
    const [complaintDetailsLoader, setComplaintDetailsLoader] = useState();

    const collectComplaintDetails = async () => {
        setComplaintDetailsLoader(true);
        let passData = {
            Id: order_details.Id,
        }
        let pageFinder = "GetEndUserComplaintRegisterById";
        FetchCalling(passData, setComplaintDetails, setComplaintDetailsLoader, pageFinder);
    }



    useEffect(() => {
        if (complaintDetailsLoader == false) {
            // console.log(complaintDetails);
            if (complaintDetails.Success == true) {
                stepUpdation('Service Complete', 10);
                setOrderStatus('10');
            }
        }
    }, [complaintDetailsLoader]);



    useEffect(() => {
        if (stepUpdateLoader10 == false) {
            // console.log(stepUpdate10);
            if (stepUpdate10.Success == true) {
                // PaymentCreation();
                showMessage({
                    message: "Service Completed",
                    type: "default",
                    floating: true,
                    position: 'bottom',
                    icon: 'success',
                    backgroundColor: "green",
                    color: '#fff',
                });
                navigation.navigate('MyOrderStackNav', {
                    screen: 'MyOrder'
                });
            }
        }
    }, [stepUpdateLoader10]);




    // const [paymentDeatils, setPaymentDeatils] = useState([]);
    // const [paymentDeatilsLoader, setPaymentDeatilsLoader] = useState();

    // const PaymentCreation = async () => {
    //     setPaymentDeatilsLoader(true);
    //     let details = JSON.parse(await AsyncStorage.getItem('userinfo'));
    //     let passData = {
    //         Id: 0,
    //         Amount: complaintDetails.Data.ServiceToTCost,
    //         Status: "Created",
    //         CardId: null,
    //         ModeTransfer: "Online",
    //         Type: "Service Payment",
    //         Purpose: complaintDetails.Data.Description,
    //         Invoice: complaintDetails.Data.Id,
    //         UserId: complaintDetails.Data.UserId,
    //         CreateBy: details.Id,
    //         ModifiedBy: details.Id,
    //     }

    //     let pageFinder = "CreateEndUserPayments";
    //     await FetchCalling(passData, setPaymentDeatils, setPaymentDeatilsLoader, pageFinder);
    // }


    // useEffect(() => {
    //     if (paymentDeatilsLoader == false) {
    //         if (paymentDeatils.Success == true) {
    //             showMessage({
    //                 message: "Service Completed",
    //                 type: "default",
    //                 floating: true,
    //                 position: 'bottom',
    //                 icon: 'success',
    //                 backgroundColor: "green",
    //                 color: '#fff',
    //             });
    //             navigation.navigate('MyOrderStackNav', {
    //                 screen: 'MyOrder'
    //             });
    //         }
    //     }
    // }, [paymentDeatilsLoader]);

    const [otpLoader, setOtpLoader] = useState();
    const [Otp, setOtp] = useState('');
    const [otpErrors, setotpErrors] = useState('');
    const [reset, setReset] = useState(false);




    return (
        <ScrollView style={styles.container} contentContainerStyle={{ position: 'relative' }}>
            <View style={[
                GlobalStyles.commonPadding,
                { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={[GlobalStyles.TextMediumBold, { color: Theme.BLUE }]}>Order Details</Text>
                {/* <Button
                    title="Add Task Force"
                    type='outline'
                    onPress={() => navigation.navigate('TaskForce')}
                    titleStyle={{ ...GlobalStyles.TextMediumBold, padding: 10, color: Theme.DIM_GRAY }}
                    buttonStyle={[styles.buttonStyle2]}
                /> */}

            </View>


            <View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailsCard}>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Task Details</Text>
                            <Text style={styles.content}>{order_details?.Description}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Order ID</Text>
                            <Text style={styles.content}>{order_details?.Id}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Customer</Text>
                            <Text style={styles.content}>{order_details?.EndUserName}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Mobile</Text>
                            <Text style={styles.content}>{order_details?.EndUserMobile}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Location</Text>
                            <Text style={styles.content}>{order_details?.Street} {order_details?.City} {order_details?.District} </Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Time</Text>
                            <Text style={styles.content}>{moment(order_details?.CreateDate).format('LT')}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.field}>Date</Text>
                            <Text style={styles.content}>{moment(order_details?.CreateDate).format('DD.MM.YYYY')}</Text>
                        </View>
                        {/* <View style={styles.contentContainer}>
                            <Text style={styles.field}>Team Members</Text>
                            <View style={[styles.content, { flexDirection: 'row' }]}>
                                {
                                    order_details.teamMembers ?
                                        (order_details.teamMembers).map((item, index) => {
                                            return (
                                                <Text key={index}>
                                                    {item}, &nbsp;
                                                </Text>
                                            )
                                        })
                                        :
                                        <Text>Not Available</Text>
                                }
                            </View>

                        </View> */}
                        {orderStatus === 'T' || orderStatus === '2' &&
                            <Button
                                onPress={collectTask}
                                title="Add/Edit Task"
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.collectbt]}
                            />
                        }
                    </View>
                    {/* {
                        orderStatus != 'NA' && orderStatus != 'T' &&
                        <AppButton type='big' style={{ width: '100%', borderColor: Theme.GREEN, marginTop: 15, marginBottom: 10 }}
                            onPress={() => { orderStatus != 'A' ? navigation.navigate('ProductDetails') : null }}
                            title='Product Details' />
                    }
                    {orderStatus != 'T' &&
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={[GlobalStyles.TextMediumBold,
                            { color: Theme.BLUE, paddingVertical: 30, textAlign: 'center' }]}>Recieved your Product?</Text>
                        </TouchableOpacity>
                    } */}
                    {/* task list here */}
                    {Object.keys(acceptData).length > 0 && acceptData?.Data.length > 0 && acceptData?.Data.length > 0 &&
                        <Accordion
                            sectionContainerStyle={styles.taskContainer}
                            sections={acceptData?.Data}
                            activeSections={activeSection}
                            underlayColor='transparent'
                            renderHeader={_renderHeader}
                            renderContent={_renderContent}
                            onChange={_updateSections}
                        />}
                    {acceptLoader &&
                        <View style={{ paddingVertical: heightPercentageToDP(3) }}>
                            <LoaderTwo />
                        </View>
                    }
                    {orderStatus != '1' && orderStatus != '2' && orderStatus != '9' && orderStatus != '8' &&
                        <Text style={[GlobalStyles.TextMediumBold, {
                            color: '#CB1306', marginTop: 10, marginLeft: 10
                        }]}>{order_details.LastStatus}
                        </Text>}

                </View>
                <View >
                    {orderStatus === '2' &&
                        Object.keys(acceptData).length > 0 && acceptData?.Data.length > 0 && acceptData?.Data.length > 0 &&
                        <View style={styles.footer}>
                            <Button
                                title="Send Approval"
                                onPress={sendApproval}
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.GREEN, }]}
                            />
                            <Button
                                onPress={() => navigation.goBack(null)}
                                title="Cancel"
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.BLUE, }]}
                            />
                        </View>
                    }
                    {orderStatus === '8' &&
                        <View style={styles.footer}>
                            <Button
                                title="Validate Otp"
                                onPress={validateOtp}
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.GREEN, }]}
                            />


                            {
                                otpLoader &&
                                <LoaderTwo style={{ marginVertical: heightPercentageToDP(3.5) }} />
                            }
                            <OTPModal
                                ModalVisible={reset}
                                setModalVisible={setReset}
                                setotpErrors={setotpErrors}
                                setOtp={setOtp}
                                stepUpdation={stepUpdation}

                                // otpData={otpData}
                                Otp={Otp}
                                setErrors={setotpErrors}
                                Errors={otpErrors}
                            />

                            <Button
                                onPress={() => navigation.goBack(null)}
                                title="Cancel"
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.BLUE, }]}
                            />
                        </View>}
                    {orderStatus === '9' &&
                        <View style={styles.footer}>
                            <Button
                                title="Complete"
                                onPress={proceed}
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.GREEN, }]}
                            />
                            <Button
                                onPress={() => navigation.goBack(null)}
                                title="Cancel"
                                titleStyle={GlobalStyles.TextBoldLarge}
                                buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.BLUE, }]}
                            />
                        </View>}
                </View>
            </View>
            {/* modal popup  */}
            {/* <ViewModal ModalVisible={ModalVisible} setModalVisible={setModalVisible} status={orderStatus} /> */}
            {
                (order_details.Latitude && order_details.Longitude) &&
                <MapViewBlock data={order_details} />
            }
        </ScrollView >
    )
}




const TaskApprovedContent = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.modalTitleText}>
                Task Approved</Text>

            <Text style={[GlobalStyles.TextSmallLight, { textAlign: 'center', paddingVertical: heightPercentageToDP(1) }]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                        </Text>

        </View>
    )
}



const ProductsRecieved = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.modalTitleText}>
                Products Recieved
                        </Text>
            <Text style={[GlobalStyles.TextSmallLight, { textAlign: 'center', paddingVertical: heightPercentageToDP(1) }]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                        </Text>

        </View>
    )
}



const TaskCancelled = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={styles.modalTitleText}>
                Task Cancelled
                        </Text>

            <Text style={[GlobalStyles.TextSmallLight, { textAlign: 'center', paddingVertical: heightPercentageToDP(1) }]}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                        </Text>
        </View>
    )
}




function ViewModal({ ModalVisible, setModalVisible, status }) {
    return (
        <Modal isVisible={ModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            backdropOpacity={0.6}
            animationOut='zoomOut'
            animationOutTiming={300}
            animationInTiming={300}
            backdropTransitionOutTiming={0}
            onBackButtonPress={() => setModalVisible(false)}
            animationIn='zoomIn'>

            <View style={[styles.modalContainer, { width: Theme.SCREEN_WIDTH - 30 }]}>
                <TouchableOpacity style={{ alignSelf: 'flex-end', }}
                    onPress={() => setModalVisible(false)}>
                    <Icon
                        name={'close'}
                        style={styles.modalCloseIcon}
                        color={Theme.WHITE}
                        size={normalize(26)}
                        config={icoMoonConfigSet}
                    />
                </TouchableOpacity>
                <View style={{
                    padding: widthPercentageToDP(1),
                    alignItems: 'center',
                }}
                >
                    <Icon
                        name={'tick'}
                        // style={styles.modalCloseIcon}
                        color={Theme.BLUE}
                        size={normalize(75)}
                        config={icoMoonConfigSet}
                    />
                    {status === 'NA' &&
                        <TaskCancelled />}
                    {status === 'A' &&
                        <TaskApprovedContent />}
                    {status === 'P' &&
                        <ProductsRecieved />}

                    <Button
                        title="OK"
                        onPress={() => setModalVisible(false)}
                        titleStyle={GlobalStyles.TextBoldLarge}
                        buttonStyle={[styles.modalButtonStyle, { backgroundColor: Theme.GREEN, }]}
                    />
                </View>
            </View>
        </Modal>
    )
}