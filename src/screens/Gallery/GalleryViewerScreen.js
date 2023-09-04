import {StyleSheet, FlatList} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import {useGallery} from './Utils/useGallery';
import Item from './Item';
import BottomSpacing from '../../theme/Global/BottomSpacing';

const GalleryViewerScreen = ({route}) => {
  const {type} = route.params;
  const {dirData} = useGallery(type);

  return (
    <ScreenSafeAreaView>
      <FlatList
        data={dirData}
        renderItem={({item}) => <Item title={item?.name} path={item?.path} />}
        keyExtractor={item => item.mtime}
        ListFooterComponent={<BottomSpacing />}
      />
    </ScreenSafeAreaView>
  );
};

export default GalleryViewerScreen;

const styles = StyleSheet.create({});
