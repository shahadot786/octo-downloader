import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';

const HomeScreen = () => {
  return (
    <ScreenSafeAreaView style={styles.container}>
      <TitleText text={'Home'} />
    </ScreenSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
