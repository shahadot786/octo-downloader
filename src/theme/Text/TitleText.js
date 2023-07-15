import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';


const TitleText = props => {
    const {text_1} = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[text_1, {...props.textStyle}]}>
        {props.text}
      </Text>
    </View>
  );
};

export default TitleText;
