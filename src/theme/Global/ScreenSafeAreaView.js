import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';

const ScreenSafeAreaView = props => {
  const { backgroundColor } = useTheme();
  return (
    <SafeAreaView style={[styles.container, backgroundColor, props.style]}>
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
