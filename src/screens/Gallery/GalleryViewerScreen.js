/* eslint-disable react-native/no-inline-styles */
import {FlatList, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import {useGallery} from './Utils/useGallery';
import Item from './Item';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AnimatedLottieView from 'lottie-react-native';
import LoaderModal from '../../components/common/LoaderModal';

const GalleryViewerScreen = ({route, navigation}) => {
  const {type} = route.params;
  const {sortData, loading} = useGallery(type);

  return (
    <ScreenSafeAreaView>
      <LoaderModal visible={loading} />
      {sortData?.length > 0 && sortData !== undefined ? (
        <FlatList
          data={sortData}
          renderItem={({item}) => (
            <Item data={item} type={type} navigation={navigation} />
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
          />
        </View>
      )}
    </ScreenSafeAreaView>
  );
};

export default GalleryViewerScreen;
