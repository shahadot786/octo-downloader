/* eslint-disable react-native/no-inline-styles */
import {FlatList, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import {useGallery} from './Utils/useGallery';
import Item from './Item';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AnimatedLottieView from 'lottie-react-native';

const GalleryViewerScreen = ({route}) => {
  const {type} = route.params;
  const {dirData} = useGallery(type);

  return (
    <ScreenSafeAreaView>
      {dirData?.length > 0 && dirData !== undefined ? (
        <FlatList
          data={dirData}
          renderItem={({item}) => (
            <Item
              title={item?.name}
              path={item?.path}
              mtime={item?.mtime}
              size={item?.size}
              type={type}
            />
          )}
          keyExtractor={item => item.mtime}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<BottomSpacing />}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedLottieView
            autoPlay
            loop
            source={require('../../assets/no_data.json')}
            // style={{height: 100}}
          />
        </View>
      )}
    </ScreenSafeAreaView>
  );
};

export default GalleryViewerScreen;
