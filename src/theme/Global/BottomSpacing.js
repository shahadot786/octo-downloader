import {View, Platform} from 'react-native';
import React from 'react';
import metrics from '../theme/metrics';
const SCREEN_WIDTH = metrics.screenWidth;
const BottomSpacing = () => {
  return (
    <View
      style={{
        height:
          SCREEN_WIDTH <= 380
            ? Platform.OS === 'ios'
              ? 55
              : 70
            : Platform.OS === 'ios'
            ? 65
            : 85,
      }}
    />
  );
};

export default BottomSpacing;