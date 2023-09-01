import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleText from '../../theme/Text/TitleText';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';

const GalleryViewerScreen = ({route}) => {
  const {data} = route.params;
  return (
    <ScreenSafeAreaView>
      <TitleText text={data} />
    </ScreenSafeAreaView>
  );
};

export default GalleryViewerScreen;

const styles = StyleSheet.create({});
