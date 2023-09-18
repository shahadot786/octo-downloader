import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import Text_Size from '../constant/fonts';

const ShortText = props => {
  const {textColor} = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        style={[styles.title, textColor, {...props.textStyle}]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_8,
  },
});

export default ShortText;
