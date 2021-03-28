import React from 'react';
import { Stylesheet } from 'react-native';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';



import Intro from '../screens/Intro';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import Verification from '../screens/Verification';

import TermsAndCondition from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
// import PaymentPolicy from '../screens/PaymentPolicy';



const BeforeLoginCreator = createStackNavigator();
function BeforeLoginStack() {
    return (
        <BeforeLoginCreator.Navigator
            initialRouteName="Intro"
        >
            <BeforeLoginCreator.Screen name="Intro" component={Intro}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />
            <BeforeLoginCreator.Screen name="LogIn" component={LogIn}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />
            <BeforeLoginCreator.Screen name="ForgotPassword" component={ForgotPassword}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />
            <BeforeLoginCreator.Screen name="ResetPassword" component={ResetPassword}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />
            <BeforeLoginCreator.Screen name="SignUp" component={SignUp}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />

            <BeforeLoginCreator.Screen name="Verification" component={Verification}
                options={(props) => ({
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                })}
            />
            <BeforeLoginCreator.Screen name="PrivacyPolicy" component={PrivacyPolicy}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />
            <BeforeLoginCreator.Screen name="TermsAndConditions" component={TermsAndCondition}
                options={{
                    header: () => null,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />

        </BeforeLoginCreator.Navigator>
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



export default function BeforeLogin() {
    return (

        <BeforeLoginStack />

    )
}




