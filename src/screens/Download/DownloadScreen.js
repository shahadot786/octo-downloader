import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import TitleText from '../../theme/Text/TitleText';

const DownloadScreen = () => {
  return (
    <ScreenSafeAreaView style={styles.container}>
      <TitleText text={'Download'} />
    </ScreenSafeAreaView>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({});
