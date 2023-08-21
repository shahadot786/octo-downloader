/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import colors from '../../../theme/constant/colors';
import BigText from '../../../theme/Text/BigText';
import metrics from '../../../theme/constant/metrics';
import TitleText from '../../../theme/Text/TitleText';

const convertSizeToGB = sizeInMB => {
  if (sizeInMB >= 1024) {
    return `${(sizeInMB / 1024).toFixed(2)} GB`;
  }
  return `${sizeInMB.toFixed(2)} MB`;
};

const CustomProgressBar = ({progress, totalSize, currentSize}) => {
  const formattedTotalSize = convertSizeToGB(totalSize / 1000000);
  const formattedCurrentSize = convertSizeToGB(currentSize / 1000000);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Progress.Bar
        progress={progress}
        width={metrics.screenWidth - 120}
        height={20}
        color={colors.Primary}
      />
      {progress !== undefined && (
        <BigText
          text={` ${Math.round(progress * 100)}%`}
          textStyle={{
            color: colors.Grey,
            fontSize: 18,
            marginVertical: 5,
            fontWeight: '600',
          }}
        />
      )}
      {totalSize !== undefined && (
        <View>
          <TitleText
            textStyle={{color: colors.Warning}}
            text={`Total Size: ${formattedTotalSize}`}
          />
          <TitleText
            textStyle={{color: colors.Grey}}
            text={`Downloaded: ${formattedCurrentSize}`}
          />
        </View>
      )}
    </View>
  );
};

export default CustomProgressBar;
