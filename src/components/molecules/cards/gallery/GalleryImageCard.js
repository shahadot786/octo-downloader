/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../../../theme/constant/colors';
import metrics from '../../../../theme/constant/metrics';
import DescriptionText from '../../../../theme/Text/DescriptionText';
import formatBytes from '../../../../utils/formatBytes';
import formatTimestamp from '../../../../utils/formatTimestamp';

const GalleryImageCard = ({path, title, mtime, size}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.Grey,
          borderRadius: 10,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <View
        style={{
          width: metrics.screenWidth / 3.5,
          height: 100,
          padding: 5,
        }}>
        <Image
          source={{uri: `file://${path}`}}
          style={{height: '100%', borderRadius: 10}}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          width: metrics.screenWidth / 1.8,
          marginHorizontal: 10,
          justifyContent: 'center',
        }}>
        <DescriptionText text={`File Name: ${title}`} />
        <DescriptionText text={`Download at: ${formatTimestamp(mtime)}`} />
        <DescriptionText text={`Size: ${formatBytes(size)}`} />
      </View>
    </Pressable>
  );
};

export default GalleryImageCard;

const styles = StyleSheet.create({});
