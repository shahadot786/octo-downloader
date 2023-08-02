import {StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
// import {useAppSelector} from '../../store/store';

const MovieScreen = () => {
  // const {movies} = useAppSelector(state => state.movies);
  return (
    <ScreenSafeAreaView>
      {/* <HeaderText text={'Updated Video List Screen'} /> */}
      <View style={styles.container}></View>
    </ScreenSafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
