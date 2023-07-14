import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Utils/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';

const HomeScreen = () => {
  return (
    <ScreenSafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
    </ScreenSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.Black },
});
