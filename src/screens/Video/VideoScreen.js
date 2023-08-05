import {StyleSheet} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import TitleText from '../../theme/Text/TitleText';

const VideoScreen = () => {
  return (
    <ScreenSafeAreaView style={styles.container}>
      <TitleText text={'Video'} />
    </ScreenSafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
