import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import TitleText from '../../theme/Text/TitleText';

const Item = ({title, path}) => {
  return (
    <View>
      {/* <TitleText text={title} /> */}
      <Image
        source={{uri: `file://${path}`}}
        // width={400}
        height={250}
        resizeMode="cover"
      />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
