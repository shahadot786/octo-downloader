import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import TitleText from '../../theme/Text/TitleText';

const ProScreen = () => {
  return (
    <ScreenSafeAreaView>
      <TitleText text={'PRO'} />
    </ScreenSafeAreaView>
  );
};

export default ProScreen;

const styles = StyleSheet.create({});
