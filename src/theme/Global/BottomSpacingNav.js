import {View, Platform} from 'react-native';
import React from 'react';
import metrics from '../constant/metrics';

const SCREEN_WIDTH = metrics.screenWidth;
const BottomSpacingNav = () => {
  return (
    <View
      style={{
        height:
          SCREEN_WIDTH <= 380
            ? Platform.OS === 'ios'
              ? 200
              : 180
            : Platform.OS === 'ios'
            ? 250
            : 270,
      }}
    />
  );
};

export default BottomSpacingNav;
