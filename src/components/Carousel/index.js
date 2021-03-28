import React from 'react';
import { View, ScrollView } from 'react-native';
import { Slide } from './slide';
import { styles } from './styles';
import Theme from '../../styles/Theme';

export const Carousel = (props) => {

    const { items, style } = props;
    const itemsPerInterval = props.itemsPerInterval === undefined
        ? 1
        : props.itemsPerInterval;

    const [interval, setInterval] = React.useState(1);
    const [intervals, setIntervals] = React.useState(1);
    const [width, setWidth] = React.useState(0);

    const init = (width) => {
        // initialise width
        setWidth(width);
        // initialise total intervals
        const totalItems = items.length;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    }

    const getInterval = (offset) => {
        for (let i = 1; i <= intervals; i++) {
            if (offset < (width / intervals) * i) {
                return i;
            }
            if (i == intervals) {
                return i;
            }
        }
    }

    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <View
                key={i}
                style={[{
                    ...styles.bullet,

                    borderColor: interval === i ? '#1E90FF' : '#A9A9A9',

                }]}
            >
                <View style={interval === i ? styles.greenCircle : ''}></View>
                {/* &bull; */}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ ...styles.scrollView, width: `${100 * intervals}%` }}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={(w, h) => init(w)}
                onScroll={data => {
                    setWidth(data.nativeEvent.contentSize.width);
                    setInterval(getInterval(data.nativeEvent.contentOffset.x));
                }}
                scrollEventThrottle={200}
                pagingEnabled
                decelerationRate="fast"
            >
                {items.map((item, index) => {

                    return (
                        <Slide
                            key={index}
                            title={item.title}
                        />
                    );
                }
                )}
            </ScrollView>
            <View style={styles.bullets}>
                {bullets}
            </View>

        </View>
    )
}

export default Carousel;