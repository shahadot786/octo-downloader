import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constant/colors';
import Text_Size from '../fonts';

const DescriptionText = props => {
  return (
    <View>
      <Text
        allowFontScaling={false}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        style={[styles.details, {color: colors.Black}, {...props.textStyle}]}>
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
