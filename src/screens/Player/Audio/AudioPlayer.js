/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Audio} from 'expo-av';
import Slider from '@react-native-community/slider';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {formatTime} from './Utils/constants';
import colors from '../../../theme/constant/colors';
import TitleText from '../../../theme/Text/TitleText';
import metrics from '../../../theme/constant/metrics';

const AudioPlayer = ({data, autoPlay = false}) => {
  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, [data]);

  const loadAudio = async () => {
    if (sound.current) {
      sound.current.unloadAsync();
    }
    let sourceUri = data?.path ? `file://${data.path}` : data?.url;
    const {sound: newSound} = await Audio.Sound.createAsync(
      {uri: sourceUri},
      {shouldPlay: autoPlay},
    );

    sound.current = newSound;

    const {durationMillis} = await newSound.getStatusAsync();
    setDuration(durationMillis);

    newSound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        sound.current.setPositionAsync(0);
        setIsPlaying(true);
      }
    });
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const updatePosition = async () => {
    const {positionMillis} = await sound.current.getStatusAsync();
    setPosition(positionMillis);
  };

  const seekAudio = value => {
    sound.current.setPositionAsync(value);
    setPosition(value);
  };

  useEffect(() => {
    const intervalId = setInterval(updatePosition, 500);
    return () => clearInterval(intervalId);
  }, []);

  let truncatedFilename = '';
  const audioFile = data?.name ? data?.name : data?.title;
  const formattedFilename = audioFile?.split('.')[0].replace(/_/g, ' ');
  if (formattedFilename.length > 30) {
    truncatedFilename = formattedFilename.substring(0, 30) + '...';
  } else {
    truncatedFilename = formattedFilename;
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        flex: 1,
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.Grey,
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}>
        <MaterialIcon name={'multitrack-audio'} size={140} color="#fff" />
      </View>
      <View style={{marginTop: 10, marginBottom: 40}}>
        <TitleText text={truncatedFilename} />
      </View>
      <View style={{marginVertical: 10, flexDirection: 'row'}}>
        <TitleText
          text={formatTime(position)}
          textStyle={{position: 'absolute', bottom: 30, left: 10}}
        />
        <Slider
          value={position}
          maximumValue={duration}
          onValueChange={seekAudio}
          style={styles.slider}
          minimumValue={0}
          minimumTrackTintColor={colors.Primary}
          maximumTrackTintColor="white"
          thumbTintColor="white"
        />
        <TitleText
          text={formatTime(duration)}
          textStyle={{position: 'absolute', bottom: 30, right: 10}}
        />
      </View>
      <TouchableOpacity onPress={togglePlayPause} activeOpacity={0.6}>
        {isPlaying ? (
          <MaterialIcon name={'pause-circle-filled'} size={50} color="#fff" />
        ) : (
          <MaterialIcon name={'play-circle-filled'} size={50} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  slider: {
    width: metrics.screenWidth - 50,
    height: 25,
  },
});
