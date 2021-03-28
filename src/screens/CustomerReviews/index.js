import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { Card } from 'react-native-elements';

import styles from './styles';
import Theme from '../../styles/Theme';
import { Rating, AirbnbRating } from 'react-native-elements';

import GlobalStyles from '../../styles/GlobalStyles';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

import { normalize } from '../../components/Normalize';


export default function CustomerReview({ navigation }) {



    const data = [
        {
            name: 'Raju K J',
            place: 'Thrissur',
            rating: 3,
            date: '11.07.2020',
            review: 'typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has took a galley of type and scrambled it to make a type specimen book it has',
        },
        {
            name: 'Raju K J',
            place: 'Thrissur',
            rating: 5,
            date: '11.07.2020',
            review: 'typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has took a galley of type and scrambled it to make a type specimen book it has',
        },
        {
            name: 'Raju K J',
            place: 'Thrissur',
            rating: 1,
            date: '11.07.2020',
            review: 'typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has took a galley of type and scrambled it to make a type specimen book it has',
        },
        {
            name: 'Raju K J',
            place: 'Thrissur',
            rating: 3,
            date: '11.07.2020',
            review: 'typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has took a galley of type and scrambled it to make a type specimen book it has',
        },
        {
            name: 'Raju K J',
            place: 'Thrissur',
            rating: 5,
            date: '11.07.2020',
            review: 'typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has took a galley of type and scrambled it to make a type specimen book it has',
        },
        {
            name: 'Raju K J',
            place: 'Thrissur',
            rating: 1,
            date: '11.07.2020',
            review: 'typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has took a galley of type and scrambled it to make a type specimen book it has',
        },


    ]
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: Theme.WHITE, paddingBottom: heightPercentageToDP(2) }} style={styles.container}>

            <View style={GlobalStyles.commonPadding}>
                <Text style={[GlobalStyles.TextMediumBold, { color: Theme.BLUE, }]}>Customer Reviews</Text>
            </View>

            {data.map((data, index) => {
                return (
                    <View key={index} View={styles.reviewContainer}>

                        <View style={{ paddingVertical: heightPercentageToDP(1), paddingHorizontal: widthPercentageToDP(2) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.title}>{data.name}</Text>
                                <Rating
                                    type='custom'
                                    ratingColor={Theme.GREEN}
                                    ratingBackgroundColor='#fff'
                                    selectedColor={Theme.GREEN}
                                    ratingCount={5}
                                    imageSize={normalize(12)}
                                    readonly
                                    startingValue={data.rating}
                                // onFinishRating={this.ratingCompleted}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={styles.text}>{data.place}</Text>
                                <Text style={styles.text}>{data.date}</Text>
                            </View>
                        </View>
                        <View style={styles.triangle}></View>
                        <View style={{ backgroundColor: '#E8E8E8', paddingVertical: heightPercentageToDP(1), paddingHorizontal: widthPercentageToDP(2) }}>
                            <Text style={styles.text}>{data.review}</Text>
                        </View>
                    </View>
                )
            })}

        </ScrollView>
    )
}
