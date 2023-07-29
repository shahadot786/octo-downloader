import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import HeaderText from '../../theme/Text/HeaderText';
import { useAppSelector } from '../../store/store';

const MovieScreen = () => {
  const { movies } = useAppSelector(state => state.firebase);
  return (
    <ScreenSafeAreaView>
      {/* <HeaderText text={'Updated Video List Screen'} /> */}
    </ScreenSafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
