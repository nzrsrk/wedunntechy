import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AntDesign } from 'react-native-vector-icons';
import { Icon, icoMoonConfigSet } from '../../styles/Icons';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';
import Theme from '../../styles/Theme';
import { normalize } from '../../components/Normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './recordingStyles';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
const audioRecorderPlayer = new AudioRecorderPlayer();
let path;
class Audio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            record: false,
            audioName: 0,
            audioList: [],
            audioPath: []
        }
    }
    async componentDidMount() {
        // const audioList = await AsyncStorage.getItem('AudioList');
        // const audioName = await AsyncStorage.getItem('AudioName');

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



    onStartRecord = async () => { //Star Recording
        console.log("inside on start record")
        path = 'sdcard/' + this.state.audioName + '.mp3';
        //const path = 'sdcard/hello.mp3'
        console.log("path",path)
        
       //const result = await audioRecorderPlayer.startRecorder(path);
       await audioRecorderPlayer.startRecorder();
        console.log("checking 1")
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log("checking 2")
            this.setState({
                recording: true,
                recordSecs: e.current_position,
                recordTime: audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
            return;
        });
    };

    onStopRecord = async (value) => { //Stop and save records to path 

        console.log("stopped record")
        
        const result = await audioRecorderPlayer.stopRecorder();
       
        
        audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
        });
        this.setState({ recording: false })
        let temp = {
            audioName: 'Voice ' + this.state.audioName,
            audioPath: path,
            serveruri: result,
            audioTime: moment().format('LT')
        }
        let t = this.state.audioList;
        t.push(temp)
        this.props.setaudio(t)
        this.setState({ t, audioName: this.state.audioName + 1, })
    };


    Warning() {
        //Alert.alert("Please Hold the button to record")
        console.log("inside warning started")
    }

    Warning2() {
        //Alert.alert("Please Hold the button to record")
        console.log("inside warning stopping")
    }

    
    Warning3() {
        //Alert.alert("Please Hold the button to record")
        console.log("inside warning press")
    }
    //  play function-->
    async onStartPlay(value) {
        SoundPlayer.loadUrl(value)
        SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
            SoundPlayer.play()
        })
    }

    // Pause play function-->
    onPausePlay = async (value) => {
        SoundPlayer.pause()
        // this.setState({ active: 'Pause' })
    };

    // Delete function-->
    async onDelete(value) {
        try {
            var t = this.state.audioList;
            let new_array = t;
            if (value > -1) {
                new_array.splice(value, 1);
                this.setState({ audioList: new_array })
            }
        } catch (error) {
            // console.log('Error in removing action')
        }
    }

    render() {

        return (
            <>
                <View style={styles.body}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: '5%' }}  onPressIn={this.onStartRecord.bind(this)} onPressOut={this.onStopRecord.bind(this)}  >
                        <View style={{ justifyContent: 'flex-end' }} >
                            <Icon
                                style={{
                                    backgroundColor: 'transparent',
                                }}
                                name={'mic'}
                                color={Theme.GREEN}
                                size={normalize(70)}
                                config={icoMoonConfigSet}
                            />
                            {/* <Text style={styles.textsm}>Tap to Record</Text> */}
                        </View>
                    </TouchableOpacity>

                    <View style={styles.voicenotes} >

                        {this.state.audioList.map((item, index) => {
                            return (
                                <View key={index} style={styles.container}>
                                    <View style={styles.container2}>
                                        {/* <View style={styles.textContainer}>
                                            <Text style={styles.name}>voice {index + 1}</Text>
                                        </View> */}
                                        <TouchableOpacity style={styles.playbtn} onPress={() => this.onStartPlay(item.audioPath)}>
                                            <AntDesign name="caretright" size={normalize(25)} color={Theme.GREEN} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.pausebtn} onPress={() => this.onPausePlay(item.audioPath)}>
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
