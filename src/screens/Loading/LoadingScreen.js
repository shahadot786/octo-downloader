import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import TitleText from '../../theme/Text/TitleText';

const LoadingScreen = () => {
  const { container, toggleTheme,initialMode } = useTheme();
  return (
    <View style={container}>
      <TitleText text={initialMode? 'Dark Mode':'Light Mode'}/>
      <Button style={styles.button} title="Toggle Mode" onPress={toggleTheme} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
