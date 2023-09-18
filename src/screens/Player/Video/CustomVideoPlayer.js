/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import metrics from '../../../theme/constant/metrics';
import * as ScreenOrientation from 'expo-screen-orientation';
import colors from '../../../theme/constant/colors';
import AppActivityIndicator from '../../../components/common/AppActivityIndicator';
import TitleText from '../../../theme/Text/TitleText';
import {formatTime} from '../Audio/Utils/constants';

const CustomVideoPlayerV1 = ({
  data,
  thumbnail,
  autoplay,
  muted,
  playBtn,
  isPlayBtnPressed,
  repeat,
  isFullScreen,
  setIsFullScreen,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(muted);
  const [hideControl, setHideControl] = useState(false);
  //   const [videoHeight, setVideoHeight] = useState();
  const videoPlayer = useRef(null);

  //handle video size according video orientation
  const handleLoad = ({duration, naturalSize}) => {
    //handle video size
    // const {orientation} = naturalSize;
    //check the orientation
    // if (orientation === 'landscape') {
    //   setVideoHeight(screenHeight / 3.85);
    // } else if (orientation == 'portrait') {
    //   setVideoHeight(screenHeight / 2);
    // }
    setDuration(duration);
    setIsLoading(false);
  };
  //handle progress
  const handleProgress = ({currentTime}) => {
    setCurrentTime(currentTime);
  };

  const toggleFullScreen = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT,
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE,
      );
    }
    setIsFullScreen(!isFullScreen);
  };
  //handle play pause
  const handlePlayPause = () => {
    // if (isPlaying) {
    //   setIsPlaying(!isPlaying);
    // } else {
    //   setIsPlaying(isPlaying);
    // }
    setIsPlaying(!isPlaying);
  };
  //handle video duration slider
  const handleSliderChange = value => {
    videoPlayer.current.seek(value);
    setCurrentTime(value);
  };
  //hide video controller
  const handleHideControl = () => {
    setHideControl(!hideControl);
  };
  //handle volume
  // const handleVolumeChange = value => {
  //   if (value === 0) {
  //     setIsMuted(false);
  //     //setVolume(1);
  //   } else {
  //     setIsMuted(true);
  //     //setVolume(0);
  //   }
  // };
  //handle mute
  const handleMutePress = () => {
    if (isMuted) {
      setIsMuted(false);
      //setVolume(0);
    } else {
      setIsMuted(true);
      //setVolume(1);
    }
  };

  console.log({currentTime});
  //   console.log({duration});
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={handleHideControl}
        style={isFullScreen ? styles.fullScreenContainer : styles.container}>
        <Video
          source={{uri: data?.path ? `file://${data.path}` : data?.url || ''}}
          ref={videoPlayer}
          resizeMode={isFullScreen ? 'stretch' : 'contain'}
          style={isFullScreen ? styles.fullScreenVideo : styles.video}
          useTextureView={true}
          preload={true}
          bufferConfig={{
            minBufferMs: 5000,
            maxBufferMs: 10000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          playInBackground={false}
          maxBitRate={1000000}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onReadyForDisplay={() => setIsLoading(false)}
          paused={!isPlaying}
          muted={!isMuted}
          onError={error => console.error(error)}
          repeat={repeat}
          //volume={volume}
          poster={thumbnail}
          posterResizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
      {/* end video player */}
      {!isLoading && (
        <>
          {playBtn && (
            <TouchableOpacity
              onPress={isPlayBtnPressed}
              activeOpacity={0.6}
              style={styles.playPauseButton}>
              <Ionicons
                name="play-circle-outline"
                size={60}
                color={colors.Primary}
              />
            </TouchableOpacity>
          )}
        </>
      )}
      {hideControl && (
        <>
          {!isLoading && (
            <>
              <TouchableWithoutFeedback onPress={handlePlayPause}>
                <View style={styles.playPauseButton}>
                  {isPlaying ? (
                    <Ionicons
                      name="pause-circle-outline"
                      size={60}
                      color={colors.Primary}
                    />
                  ) : (
                    <Ionicons
                      name="play-circle-outline"
                      size={60}
                      color={colors.Primary}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
        </>
      )}
      {/* loader */}
      {isLoading && (
        <View style={styles.loading}>
          <AppActivityIndicator />
        </View>
      )}
      {/* end loader */}
      {hideControl ? (
        <>
          {!isLoading && (
            <View style={styles.controls}>
              {/* <Text style={styles.time}>
                {Math.floor(currentTime / 60)}:
                {('0' + Math.floor(currentTime % 60)).slice(-2)} /{' '}
                {Math.floor(duration / 60)}:
                {('0' + Math.floor(duration % 60)).slice(-2)}
              </Text> */}
              <TitleText text={formatTime(duration)} />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={handleSliderChange}
                minimumTrackTintColor={colors.Primary}
                maximumTrackTintColor="white"
                thumbTintColor="white"
              />
              <TitleText text={currentTime} />
              <TouchableWithoutFeedback onPress={handleMutePress}>
                <View style={styles.volumeButton}>
                  {isMuted ? (
                    <Ionicons
                      name="volume-medium-sharp"
                      size={26}
                      color={colors.Primary}
                    />
                  ) : (
                    <Ionicons
                      name="volume-mute"
                      size={26}
                      color={colors.Primary}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.fullScreenButton}
                onPress={toggleFullScreen}>
                {isFullScreen ? (
                  <MaterialIcon
                    name={'fullscreen-exit'}
                    size={35}
                    color={colors.Primary}
                  />
                ) : (
                  <MaterialIcon
                    name={'fullscreen'}
                    size={35}
                    color={colors.Primary}
                  />
                )}
              </TouchableOpacity>
              {/* volume */}
              {/* {isMuted && (
                <Slider
                  style={styles.volumeSlider}
                  minimumValue={0}
                  maximumValue={volume}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FFFFFF"
                  value={volume}
                  onValueChange={handleVolumeChange}
                  vertical
                />
              )} */}
            </View>
          )}
        </>
      ) : (
        <>
          {/* {muted && (
            <TouchableWithoutFeedback onPress={handleMutePress}>
              <View style={styles.volumeButtonOutside}>
                {isMuted ? (
                  <Ionicons
                    name="volume-medium-sharp"
                    size={34}
                    color={'white'}
                  />
                ) : (
                  <Ionicons name="volume-mute" size={34} color={'white'} />
                )}
              </View>
            </TouchableWithoutFeedback>
          )} */}
          {/* volume */}
          {/* {isMuted && (
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={volume}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              value={volume}
              onValueChange={handleVolumeChange}
              vertical
            />
          )} */}
        </>
      )}
      {/* end control */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  fullScreenContainer: {
    flex: 1,
  },
  video: {
    width: metrics.screenWidth,
    aspectRatio: 16 / 9,
  },
  fullScreenVideo: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(19, 17, 17, 0.342)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  time: {
    color: 'white',
  },
  playPauseButton: {
    width: 60,
    height: 60,
    position: 'absolute',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1111111111,
  },
  slider: {
    flex: 1,
    height: 25,
  },
  cancelBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 5,
    marginTop: 5,
    zIndex: 111111,
  },
  volumeButton: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  volumeButtonOutside: {
    width: 34,
    height: 34,
    right: 10,
    position: 'absolute',
    bottom: 80,
  },
  volumeSlider: {
    height: 50,
    width: 100,
    transform: [{rotate: '-90deg'}],
    right: -30,
    position: 'absolute',
    bottom: 40,
  },
});

export default CustomVideoPlayerV1;
