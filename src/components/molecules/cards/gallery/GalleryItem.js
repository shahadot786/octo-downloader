import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import metrics from '../../../../theme/constant/metrics';
import TitleText from '../../../../theme/Text/TitleText';
const GalleryItem = ({backgroundColor, iconName, title, onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        {backgroundColor: backgroundColor, opacity: pressed ? 0.7 : 1},
      ]}
      onPress={onPress}>
      {/* icon */}
      <MaterialIcon name={iconName} size={30} color="#fff" />
      {/* name */}
      <TitleText text={title} />
      {/* length */}
    </Pressable>
  );
};

export default GalleryItem;

const styles = StyleSheet.create({
  container: {
    width: metrics.screenWidth / 2.2,
    height: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
