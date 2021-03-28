import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import Theme from '../../styles/Theme';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';

import GlobalStyles from '../../styles/GlobalStyles';

import Modal from 'react-native-modal';
import { AppTextInput } from '../../components/AppTextInput';

import { Validate } from '../../components/validate';
import { FetchCalling } from '../../routes/APICalls';

import { showMessage } from "react-native-flash-message";
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';

function Purchase({ route, navigation }) {

    // set the active screen
    const [OrderDetails, setOrderDetails] = useState(route.params.details);
    const [items, setItems] = useState(route.params.task.PurchaseOrder);  // set all items that already added into db
    const [extraItems, setExtraItems] = useState([]); // for adding extr items
    const [ModalVisible, setModalVisible] = useState(false);
    //  removal of extra items
    const RemoveItem = (index) => {
        let array = [...extraItems || []];
        array.splice(index, 1);
        setExtraItems(array)
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
    // delete existing purchase Orders before Saving
    const [DeletePurchaseData, setDeletePurchaseData] = useState([]);
    const [purchaseDeleteLoader, setpurchaseDeleteLoader] = useState();

    const DeleteExistingPurchaseOrder = (item) => {
        let pageFinder = "DeletePurchaseOrder";
        let passData = {
            Id: item.Id,
        }
        setpurchaseDeleteLoader(true);
        FetchCalling(passData, setDeletePurchaseData, setpurchaseDeleteLoader, pageFinder);
    }
    const [PurchaseUpdateLoader, setPurchaseUpdateLoader] = useState(false);
    const updatePurchaseOrder = () => {
        setPurchaseLoader(true)
        if (extraItems?.length != 0) {
            extraItems?.map((item, index) => {
                if (item.length != 0)
                    savePurchaseList(item, index, route.params.task.Id)
            })
            setPurchaseUpdateLoader(true)
        }
        else {
            setPurchaseUpdateLoader(true)
        }
    }
    useEffect(() => {
        if (PurchaseUpdateLoader) {
            showMessage({
                message: "Updated Successfully",
                type: "default",
                floating: true,
                position: 'bottom',
                icon: 'success',
                backgroundColor: "green",
                color: '#fff',
            });
            navigation.navigate('MyOrderStackNav', {
                screen: 'OrderDetails'
            });
        }

    }, [PurchaseUpdateLoader]);

    const [purchaseListData, setpurchaseListData] = useState([]);
    const [PurchaseLoader, setPurchaseLoader] = useState();

    const savePurchaseList = async (item, index, subTaskId) => {
        if (item.Id === 0) { // -> *condition 
            let pageFinder = "CreatePurchaseOrder";
            let passData = {
                Id: item.Id,
                // SlNo: index,
                Items: item.name,
                Quantity: item.qty,
                // price: 2500000,
                SubTaskId: subTaskId,
                Status: "Created"
            }

            setPurchaseLoader(true);
            await FetchCalling(passData, setpurchaseListData, setPurchaseLoader, pageFinder);
        }
    }




    useEffect(() => {
        if (!purchaseDeleteLoader) {
            if (DeletePurchaseData.Success) {
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
    }, [purchaseDeleteLoader]);

    // --------- delete item that already added in db
    const DeleteItemFromDB = (index, item) => {
        let array = [...items || []];
        array.splice(index, 1);
        setItems(array)
        if (item.length != 0)
            DeleteExistingPurchaseOrder(item);
    }

    //  adding extra items for user
    const ExtraItem = () => {
        return extraItems.map((item, index) =>
            <View key={index} style={styles.purchaseContentInner}>
                <Text style={[styles.items, { flex: 1, borderBottomLeftRadius: (index == items.length - 1) ? 5 : 0 }]}>{items.length + index + 1}</Text>
                <Text style={[styles.items, { flex: 4 }]}>{item.name}</Text>
                <View style={[styles.extraitems, { flex: 2, borderBottomRightRadius: (index == items.length - 1) ? 5 : 0 }]}>
                    <Text style={[styles.extraItemsText]}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => RemoveItem(index)}>
                        <Icon
                            style={{ backgroundColor: '#fff', borderRadius: 15, marginLeft: widthPercentageToDP(.5) }}
                            name={'delete'}
                            color={Theme.BLUE}
                            size={normalize(20)}
                            config={icoMoonConfigSet}
                        />
                    </TouchableOpacity>
                </View>
            </View >
        );
    }



    return (
        <ScrollView style={styles.container}>
            <Text style={[GlobalStyles.TextMediumBold,
            GlobalStyles.commonPadding, { color: Theme.BLUE }]}>
                Product Detail
            </Text>

            <View style={styles.detailContainer}>

                <View style={styles.detailsCard}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.field}>Name</Text>
                        <Text style={styles.content}>{OrderDetails.EndUserName}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.field}>Location</Text>
                        <Text style={styles.content}> {OrderDetails.Street + "\n"} {OrderDetails.City + "\n"} {OrderDetails.District}</Text>
                    </View>

                </View>

                <View style={styles.purchaseList}>

                    <View style={[styles.heading, { padding: widthPercentageToDP(1) }]}>

                        <Text style={{ color: Theme.WHITE, fontSize: Theme.FONT_SIZE_MEDIUM, fontFamily: "Roboto-Bold", marginLeft: widthPercentageToDP(1.6) }}>Purchase list</Text>

                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Icon
                                style={{ backgroundColor: '#fff', borderRadius: 15 }}
                                name={'plus_11'}
                                color={Theme.BLUE}
                                size={normalize(30)}
                                config={icoMoonConfigSet}
                            />
                        </TouchableOpacity>

                    </View>
                    {/* to show already added  purchase orders */}
                    <View style={styles.purchaseContent}>

                        {
                            items?.map((item, index) => {
                                return (
                                    <View key={index}>
                                        {index === 0 && <View style={[styles.purchaseContentInner, { backgroundColor: '#E8E8E8' }]}>
                                            <Text style={[styles.items, { flex: 1 }]}>Sl No</Text>
                                            <Text style={[styles.items, { flex: 4 }]}>Items</Text>
                                            <Text style={[styles.items, { flex: 2 }]}>Qty</Text>
                                        </View>}
                                        <View style={styles.purchaseContentInner}>
                                            <Text style={[styles.items, { flex: 1, borderBottomLeftRadius: (index == items.length - 1) ? 5 : 0 }]}>{index + 1}</Text>
                                            <Text style={[styles.items, { flex: 4 }]}>{item.Items}</Text>
                                            {/* <Text style={[styles.items, { flex: 2, borderBottomRightRadius: (index == items.length - 1) ? 5 : 0 }]}>{item.qty}</Text> */}
                                            <View style={[styles.extraitems, { flex: 2, borderBottomRightRadius: (index == items.length - 1) ? 5 : 0 }]}>
                                                <Text style={[styles.extraItemsText]}>{item.Quantity}</Text>
                                                <TouchableOpacity onPress={() => DeleteItemFromDB(index, item)}>
                                                    <Icon
                                                        style={{ backgroundColor: '#fff', borderRadius: 15, marginLeft: widthPercentageToDP(.5) }}
                                                        name={'delete'}
                                                        color={Theme.BLUE}
                                                        size={normalize(20)}
                                                        config={icoMoonConfigSet}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <ExtraItem />

                    </View>

                </View>

            </View>



            <View style={styles.footer}>
                <Button
                    title="Done"
                    onPress={() => {
                        updatePurchaseOrder()
                    }}
                    titleStyle={styles.modalbtnTitle1}

                    buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.GREEN, }]}
                />
                <Button
                    onPress={() => navigation.goBack(null)}
                    title="Cancel"
                    titleStyle={styles.modalbtnTitle1}
                    buttonStyle={[styles.buttonStyle, { backgroundColor: Theme.BLUE, }]}
                />
            </View>
            <AddItemModal ModalVisible={ModalVisible}
                setModalVisible={setModalVisible}
                extraItems={extraItems}
                setExtraItems={setExtraItems}
            />
        </ScrollView >
    )
}

export default Purchase;

//  modal to input extra items

function AddItemModal({ ModalVisible, setModalVisible, extraItems, setExtraItems }) {
    const [Items, setItems] = useState({ Id: 0, name: '', qty: '' });
    const [Error, setError] = useState({ name: '', qty: '' });
    const updateValue = () => {
        let nameError = Validate('Item', 'isEmpty', Items.name)
        let qtyError = Validate('Quantity', 'isEmpty', Items.qty)
        setError({ ...Error, name: nameError, qty: qtyError })
        if (nameError === '' && qtyError === '') {
            let array = [...extraItems || []];
            array.push(Items)
            setExtraItems(array)
            setModalVisible(false)
            setItems({ Id: 0, name: '', qty: '' })
        }
    }

    return (

        < Modal isVisible={ModalVisible}
            onBackdropPress={() => setModalVisible(false)
            }
            onBackButtonPress={() => setModalVisible(false)}
            animationOutTiming={500}
            animationInTiming={500}
            backdropTransitionOutTiming={0}
            animationOut='zoomOut'
            backdropOpacity={0.6}

            animationIn='zoomIn' >
            <View style={styles.modalContainer}>
                <AppTextInput
                    label='Item'
                    inputStyle={{ paddingBottom: heightPercentageToDP(2) }}
                    icon={'credit_card'}
                    value={Items.name}
                    errorMessage={Error.name}
                    onChangeText={(value) => setItems({ ...Items, name: value })}
                />
                <AppTextInput
                    label='Quantity'
                    inputStyle={{ paddingBottom: heightPercentageToDP(2) }}
                    icon={'credit_card'}
                    keyboardType={'numeric'}
                    value={Items.qty}
                    errorMessage={Error.qty}
                    onChangeText={(value) => setItems({ ...Items, qty: value })}
                />
                <View style={{ flexDirection: 'row', paddingVertical: heightPercentageToDP(.5) }}>
                    <Button
                        title="Add Item"
                        titleStyle={styles.modalbtnTitle1}
                        buttonStyle={[styles.modalbtnStyle1, { borderColor: Theme.PRIMARY_COLOR, marginRight: widthPercentageToDP(.5) }]}
                        onPress={() => updateValue()}
                    />

                    <Button
                        title="Cancel"
                        type="outline"
                        titleStyle={styles.modalbtnTitle2}
                        buttonStyle={styles.modalbtnStyle2}
                        onPress={() => {
                            setModalVisible(false)
                        }}
                    />

                </View>
            </View>
        </Modal >
    )
}