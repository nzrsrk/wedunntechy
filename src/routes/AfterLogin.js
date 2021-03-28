import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


import Home from '../screens/Home';
import WedunnHours from '../screens/Payment';
import TimeSlots from '../screens/TimeSlots';

import OrderDetails from '../screens/OrderDetails';
import OrderTask from '../screens/CollectTask';
import TaskForce from '../screens/AddTaskForce';

import ProductDetails from '../screens/Purchase'
import Notification from '../screens/Notification';
import TermsAndCondition from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import PaymentPolicy from '../screens/PaymentPolicy';

import Profile from '../screens/Profile';
import ProfileFill from '../screens/ProfileFill';
import EditProfile from '../screens/EditProfile';
import ChangePasswordProfile from '../screens/ChangePasswordProfile';

import AddTeam from '../screens/AddTeam';
import MyTeam from '../screens/MyTeam';
import Subscription from '../screens/Subscription';
import CustomerReview from '../screens/CustomerReviews';

import CustomTab from '../components/CustomTab';
import CustomDrawerContent from '../components/CustomDrawer';
import HeaderHome from '../components/Header';

import CustomTopTab from '../components/CustomTopTab';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Accepted from '../screens/Accepted';
import OnGoing from '../screens/OnGoing';
import Completed from '../screens/Completed';


const Homestack = createStackNavigator();
const HomestackNav = ({ navigation }) => {
    return (
        <Homestack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <Homestack.Screen
                name="Home"
                component={Home}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </Homestack.Navigator>
    )
}

const orderTab = createMaterialTopTabNavigator();
const orderTabNav = ({ navigation }) => {
    return (
        <orderTab.Navigator
            tabBar={props => <CustomTopTab {...props} />}
            initialRouteName="Accepted">
            <orderTab.Screen name="Accepted" component={Accepted} />
            <orderTab.Screen name="OnGoing" component={OnGoing} />
            <orderTab.Screen name="Completed" component={Completed} />
        </orderTab.Navigator>
    )
}



const MyOrderStack = createStackNavigator();
const MyOrderStackNav = ({ navigation }) => {
    return (
        <MyOrderStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <MyOrderStack.Screen
                name="MyOrder"
                component={orderTabNav}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <MyOrderStack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <MyOrderStack.Screen
                name="OrderTask"
                component={OrderTask}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <MyOrderStack.Screen
                name="TaskForce"
                component={TaskForce}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <MyOrderStack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />

        </MyOrderStack.Navigator>
    )
}




const timeSlotsStack = createStackNavigator();
const timeSlotsStackNav = ({ navigation }) => {
    return (
        <timeSlotsStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <timeSlotsStack.Screen
                name="Timeslots"
                component={TimeSlots}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </timeSlotsStack.Navigator>
    )
}



const WedunnHoursStack = createStackNavigator();
const WedunnHoursStackNav = ({ navigation }) => {
    return (
        <WedunnHoursStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <WedunnHoursStack.Screen
                name="WedunnHours"
                component={WedunnHours}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </WedunnHoursStack.Navigator>
    )
}



const Profilestack = createStackNavigator();
const ProfilestackNav = ({ navigation }) => {
    return (
        <Profilestack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <Profilestack.Screen
                name="Profile"
                component={Profile}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <Profilestack.Screen
                name="ProfileFillView"
                component={ProfileFill}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <Profilestack.Screen
                name="EditProfile"
                component={EditProfile}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <Profilestack.Screen
                name="AddTeam"
                component={AddTeam}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <Profilestack.Screen
                name="MyTeam"
                component={MyTeam}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />

            <Profilestack.Screen
                name="CustomerReview"
                component={CustomerReview}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <Profilestack.Screen
                name="ChangePassword"
                component={ChangePasswordProfile}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </Profilestack.Navigator>
    )
}



const PrivacyPolicyStack = createStackNavigator();
const PrivacyPolicyStackNav = ({ navigation }) => {
    return (
        <PrivacyPolicyStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <PrivacyPolicyStack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </PrivacyPolicyStack.Navigator>
    )
}

const PaymentPolicyStack = createStackNavigator();
const PaymentPolicyStackNav = ({ navigation }) => {
    return (
        <PaymentPolicyStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <PaymentPolicyStack.Screen
                name="PaymentPolicy"
                component={PaymentPolicy}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </PaymentPolicyStack.Navigator>
    )
}
const TermsAndConditionStack = createStackNavigator();
const TermsAndConditionStackNav = ({ navigation }) => {
    return (
        <TermsAndConditionStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <NotificationStack.Screen
                name="TermsAndCondition"
                component={TermsAndCondition}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </TermsAndConditionStack.Navigator>
    )
}




const SubscriptionStack = createStackNavigator();
const SubscriptionStackNav = ({ navigation }) => {
    return (
        <SubscriptionStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <SubscriptionStack.Screen
                name="Subscription"
                component={Subscription}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </SubscriptionStack.Navigator>
    )
}

const NotificationStack = createStackNavigator();
const NotificationStackNav = ({ navigation }) => {
    return (
        <NotificationStack.Navigator
            headerMode='float'
            screenOptions={(props) => ({
                header: () => <HeaderHome {...props} />
            })}>
            <NotificationStack.Screen
                name="Notification"
                component={Notification}
                options={(props) => ({
                    // header: () => <HeaderHome {...props} />,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
        </NotificationStack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator();
const BottomTabNav = () => {
    return (
        <BottomTab.Navigator
            tabBar={props => <CustomTab {...props} />}
            initialRouteName="HomestackNav"
            backBehavior="initialRoute"
        >
            <BottomTab.Screen name="MyOrderStackNav" component={MyOrderStackNav}
                options={{
                    tabBarLabel: 'Orders',
                    iconName: 'orders',
                }}
            />

            <BottomTab.Screen name="timeSlotsStackNav" component={timeSlotsStackNav}
                options={{
                    tabBarLabel: 'Time Slots',
                    iconName: 'hours'
                }}
            />
            <BottomTab.Screen name="WedunnHoursStackNav" component={WedunnHoursStackNav}
                options={{
                    tabBarLabel: 'Payments',
                    iconName: 'wallet_menu'
                }}
            />
            <BottomTab.Screen name="HomestackNav" component={HomestackNav}
                options={{
                    tabBarLabel: ' Home ',
                    iconName: 'home'
                }}
            />

            <Drawer.Screen name="Notification" component={NotificationStackNav} />
            <Drawer.Screen name="Profile" component={ProfilestackNav} />
            <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyStackNav} />
            <Drawer.Screen name="TermsAndConditions" component={TermsAndConditionStackNav} />
            <Drawer.Screen name="PaymentPolicy" component={PaymentPolicyStackNav} />
            <Drawer.Screen name="Subscription" component={SubscriptionStackNav} />
        </BottomTab.Navigator>
    )
}



const config = {
    animation: 'spring',
    config: {
        stiffness: 100000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};



const useInitialRender = () => {
    const [isInitialRender, setIsInitialRender] = React.useState(false);

    if (!isInitialRender) {
        setTimeout(() => setIsInitialRender(true), 10);
        return true;
    }
    return false;
};








const Drawer = createDrawerNavigator();
const AfterLogin = () => {
    const isInitialRender = useInitialRender();

    return (
        <Drawer.Navigator
            openByDefault={false}
            backBehavior='initialRoute'
            drawerContent={props => <CustomDrawerContent {...props} />}
            drawerPosition={'right'}
            drawerStyle={{ width: isInitialRender ? 0 : '80%' }}
        >
            <Drawer.Screen name="HomeTab" component={BottomTabNav} />
        </Drawer.Navigator>
    )
}

export default AfterLogin;