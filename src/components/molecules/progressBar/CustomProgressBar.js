import {View} from 'react-native';
import React from 'react';
import BigText from '../../../theme/Text/BigText';

const CustomProgressBar = progress => {
  return (
    <View>
      <BigText text={Math.floor(progress?.progress) + '%'} />
    </View>
  );
};

export default CustomProgressBar;
