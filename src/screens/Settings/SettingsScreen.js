import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import { commonStyles } from '../../styles/commonStyles';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';

const SettingsScreen = () => {
  const { toggleTheme } = useTheme();
  return (
    <ScreenSafeAreaView style={commonStyles.justifyAlignCenter}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </ScreenSafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
