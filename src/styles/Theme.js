import { Dimensions } from 'react-native';
import { normalize as Normalize } from '../components/Normalize';

export default {


    PRIMARY_COLOR: '#2D98F9',
    SECONDARY_COLOR: '#8DBE25',


    WHITE: '#FFFFFF',
    GREEN: '#8DBE24',
    BLUE: '#2D96F8',

    GRAY_OPACITY: 'rgba(0,0,0,0.2)',
    DARK_RED: '#A12D3F',
    DARK_BLUE: '#37537D',
    GRAY_BLUE: '#7F8CA0',
    BLUE_MEDIUM: '#2190F8',
    DARK_GRAY: '#3E4041',
    DIM_GRAY: '#5E5E5F',

    FONT_ELEVEN: Normalize(11),
    FONT_SIZE_SMALL: Normalize(12),
    FONT_THIRTEEN: Normalize(13),
    FONT_SIZE_MEDIUM: Normalize(14),
    FONT_FIFTEEN: Normalize(15),
    FONT_SIZE_LARGE: Normalize(16),
    FONT_SEVENTEEN: Normalize(17),
    FONT_SIZE_EXTRA_LARGE: Normalize(18),
    FONT_TWNETY: Normalize(20),
    FONT_TWENTYFIVE: Normalize(26),
    FONT_TWENTYSIX: Normalize(26),
    FONT_WEIGHT_LIGHT: 200,
    FONT_WEIGHT_MEDIUM: 600,
    FONT_WEIGHT_HEAVY: 800,
    SCREEN_HEIGHT: Dimensions.get('window').height,
    SCREEN_WIDTH: Dimensions.get('window').width,

}