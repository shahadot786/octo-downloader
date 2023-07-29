import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import Text_Size from '../constant/fonts';

const DescriptionText = props => {
  const { textColor } = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        style={[styles.details, textColor, { ...props.textStyle }]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: Text_Size.Text_9,
  },
});

export default DescriptionText;
