import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import Theme from '../../styles/Theme';
import { normalize } from '../../components/Normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { baseURL } from '../../routes/APICalls'
import styles from './recordingStyles';


console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
const audioRecorderPlayer = new AudioRecorderPlayer();
class Audio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            record: false,
            audioName: 0,
            audioList: [],
        }
    }
    async componentDidMount() {
        const audioList = this.props.audios;
        // const audioList = await AsyncStorage.getItem('AudioList');
        // const audioName = await AsyncStorage.getItem('AudioName');
        this.setState({ audioList: audioList != null ? audioList : [] })

        this._onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            // console.log('finished playing', success)
        })
        this._onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
            // console.log('finished loading', success)
        })
        this._onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
            // console.log('finished loading file', success, name, type)
        })
        this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            // console.log('finished loading url', success, url)
        })

    }
    async componentWillUnmount() {
        this._onFinishedPlayingSubscription && this._onFinishedPlayingSubscription.remove()
        this._onFinishedLoadingSubscription && this._onFinishedLoadingSubscription.remove()
        this._onFinishedLoadingFileSubscription && this._onFinishedLoadingFileSubscription.remove()
    }




    async onStartPlay(value) {
        SoundPlayer.loadUrl(baseURL + value)
        SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            SoundPlayer.play()
        })
    }

    // Pause play function-->
    onPausePlay = async (value) => {
        SoundPlayer.pause()
    };

    deletefile = async (value) => {
        var raw = JSON.stringify({ "OldName": value });
        fetch('http://godlandit.pythonanywhere.com/api/file/delete/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json",
            },
            body: raw,
        })
            .then((response) => response.json())
            .then((responseJSON) => {
            })
            .catch((error) => { console.error(error) })
            .finally(() => {

            })
    }


    // Delete function-->
    async onDelete(value) {
        await this.deletefile(this.state.audioList[value]);
        try {
            var t = this.state.audioList;
            let new_array = t;
            if (value > -1) {
                new_array.splice(value, 1);
                this.setState({ audioList: new_array })
                this.props.setaudiofiles(new_array)
                this.props.SaveCollectTask(new_array);
                this.props.sethasFunctionFetching(false)
            }
        } catch (error) {
            // console.log('Error in removing action')
        }
    }


    render() {

        return (
            <>
                <View style={styles.body}>

                    <View style={styles.voicenotes} >

                        {this.state.audioList.map((item, index) => {
                            return (
                                <View key={index} style={styles.container}>
                                    <View style={styles.container2}>
                                        <TouchableOpacity style={styles.playbtn} onPress={() => this.onStartPlay(item)}>
                                            <AntDesign name="caretright" size={normalize(25)} color={Theme.GREEN} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.pausebtn} onPress={() => this.onPausePlay(item)}>
                                            <AntDesign name="pause" size={normalize(25)} color={Theme.GREEN} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.delete} onPress={() => this.onDelete(index)}>
                                            <Icon
                                                style={{
                                                    backgroundColor: 'transparent',
                                                }}
                                                name={'delete'}
                                                color={'red'}
                                                size={normalize(25)}
                                                config={icoMoonConfigSet}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>

            </>
        );
    };
}

export default Audio;
