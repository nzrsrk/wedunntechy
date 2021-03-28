import { Dimensions, Platform, PixelRatio } from "react-native";

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    if (SCREEN_WIDTH < 500) {
        return size
    }
    else if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 14
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

