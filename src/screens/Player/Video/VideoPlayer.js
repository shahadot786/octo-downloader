/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {ResizeMode, Video} from 'expo-av';
import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import metrics from '../../../theme/constant/metrics';
import {formatTime} from '../Audio/Utils/constants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TitleText from '../../../theme/Text/TitleText';
import colors from '../../../theme/constant/colors';

const VideoPlayer = ({
  data,
  autoPlay,
  navigation,
  isFullScreen,
  setIsFullScreen,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(0);
  const [controls, setControls] = useState(true);

  useEffect(() => {
    const playbackObject = videoRef.current;
    if (playbackObject) {
      playbackObject.setOnPlaybackStatusUpdate(status => {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);

        // Check if the video has finished playing and replay it
        if (status.didJustFinish) {
          playbackObject.replayAsync();
        }
      });
    }
  }, []);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
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

  const seekTo = async p => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded) {
        await videoRef.current.setPositionAsync(p);
        setPosition(p);
      }
    }
  };

  return (
    <Pressable
      onPress={() => setControls(!controls)}
      style={isFullScreen ? styles.fullScreenContainer : styles.container}>
      <Video
        ref={videoRef}
        source={{uri: data?.path ? `file://${data.path}` : data?.url || ''}}
        resizeMode={isFullScreen ? ResizeMode.STRETCH : ResizeMode.CONTAIN}
        style={isFullScreen ? styles.fullScreenVideo : styles.video}
      />
      {controls && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#75757533',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.playPauseButton}
            onPress={togglePlayPause}>
            {isPlaying ? (
              <MaterialIcon
                name={'pause-circle-filled'}
                size={40}
                color={colors.Primary}
              />
            ) : (
              <MaterialIcon
                name={'play-circle-filled'}
                size={40}
                color={colors.Primary}
              />
            )}
          </TouchableOpacity>
          <TitleText text={formatTime(position)} />
          <Slider
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={seekTo}
            onValueChange={seekTo}
            style={isFullScreen ? styles.sliderFull : styles.slider}
            minimumTrackTintColor={colors.Primary}
            maximumTrackTintColor="white"
            thumbTintColor="white"
          />
          <TitleText text={formatTime(duration)} />
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
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  playPauseButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  fullScreenButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  slider: {
    width: metrics.screenWidth / 2.1,
    height: 25,
  },
  sliderFull: {flex: 1, height: 25},
});

export default VideoPlayer;
