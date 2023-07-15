import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import { commonStyles } from '../../styles/commonStyles';

const SettingsScreen = () => {
  const { toggleTheme } = useTheme();
  return (
    <View style={commonStyles.justifyAlignCenter}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
