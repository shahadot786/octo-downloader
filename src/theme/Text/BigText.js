import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import useTheme from '../../hooks/theme/useTheme';
import Text_Size from '../constant/fonts';

const BigText = props => {
  const { textColor } = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[textColor, styles.title, { ...props.textStyle }]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_2,
    fontWeight: '600',
  },
});

export default BigText;
