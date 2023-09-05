import {StyleSheet, View} from 'react-native';
import React from 'react';
import GalleryImageCard from '../../components/molecules/cards/gallery/GalleryImageCard';

const Item = ({title, path, mtime, size, type}) => {
  return (
    <View style={styles.container}>
      {/* Image */}
      {type === 'image' && (
        <GalleryImageCard title={title} path={path} mtime={mtime} size={size} />
      )}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 15,
  },
});
