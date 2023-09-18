/* eslint-disable react-native/no-inline-styles */
import {View, Pressable} from 'react-native';
import React from 'react';
import colors from '../../../theme/constant/colors';

const TabButton = ({children, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          bottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.9 : 1,
        },
      ]}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.Primary,
        }}>
        {children}
      </View>
    </Pressable>
  );
};

export default TabButton;
