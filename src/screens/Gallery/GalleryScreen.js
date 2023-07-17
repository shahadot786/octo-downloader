import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import TitleText from '../../theme/Text/TitleText';
import AppUpdateModal from '../../components/templates/modal/AppUpdateModal';

const GalleryScreen = () => {
  return (
    <ScreenSafeAreaView style={styles.container}>
      <TitleText text={'Gallery'} />
    </ScreenSafeAreaView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({});
