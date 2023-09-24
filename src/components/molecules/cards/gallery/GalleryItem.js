import {StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import metrics from '../../../../theme/constant/metrics';
import BigText from '../../../../theme/Text/BigText';

const GalleryItem = ({
  backgroundColor,
  iconName,
  title,
  onPress,
  imageSource,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        {backgroundColor: backgroundColor, opacity: pressed ? 0.7 : 1},
      ]}
      onPress={onPress}>
      <Image source={imageSource} style={styles.imagesContainer} />
      {/* icon */}
      <MaterialIcon name={iconName} size={35} color="#fff" />
      {/* name */}
      <BigText text={title} />
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
  imagesContainer: {
    height: 130,
    width: metrics.screenWidth / 2.2,
    borderRadius: 10,
    // marginVertical: 10,
    position: 'absolute',
    opacity: 0.2,
  },
});
