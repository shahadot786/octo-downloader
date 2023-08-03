import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import colors from '../constant/colors';

const ScreenSafeAreaView = props => {
  const {backgroundColor, initialMode} = useTheme();
  return (
    <SafeAreaView style={[styles.container, backgroundColor, props.style]}>
      <StatusBar
        // animated={true}
        backgroundColor={initialMode ? colors.Black : colors.White}
        barStyle={initialMode ? 'light-content' : 'dark-content'}
      />
      {props.children}
    </SafeAreaView>
  );
};

export default ScreenSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
  },
});
