import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';

const LoadingScreen = () => {
  const { container, text, toggleTheme, isDarkMode } = useTheme();
  return (
    <View style={container}>
      <Text style={text}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
      <Button style={styles.button} title="Toggle Mode" onPress={toggleTheme} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
