import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../constant/colors';
import Text_Size from '../fonts';


const HeaderText = props => {
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[styles.title, {color: colors.Black}, {...props.textStyle}]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_3,
    fontWeight: '700',
  },
});

export default HeaderText;
