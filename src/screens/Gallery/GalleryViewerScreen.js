/* eslint-disable react-native/no-inline-styles */
import {FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import {useGallery} from './Utils/useGallery';
import Item from './Item';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AnimatedLottieView from 'lottie-react-native';
import LoaderModal from '../../components/common/LoaderModal';

const GalleryViewerScreen = ({route}) => {
  const [sortData, setSortData] = useState([]);
  const {type} = route.params;
  const {dirData, loading} = useGallery(type);

  useEffect(() => {
    if (!dirData || dirData.length === 0) {
    } else {
      const sortedData = dirData.slice();
      sortedData.sort((a, b) => {
        if (a.mtime === undefined && b.mtime === undefined) {
          return 0;
        }
        if (a.mtime === undefined) {
          return 1;
        }
        if (b.mtime === undefined) {
          return -1;
        }
        const dateA = new Date(a.mtime);
        const dateB = new Date(b.mtime);
        return dateB - dateA;
      });
      setSortData(sortedData);
    }
  }, [dirData]);

  return (
    <ScreenSafeAreaView>
      <LoaderModal visible={loading} />
      {dirData?.length > 0 && dirData !== undefined ? (
        <FlatList
          data={sortData}
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
