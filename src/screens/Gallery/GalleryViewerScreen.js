/* eslint-disable react-native/no-inline-styles */
import {FlatList, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import {useGallery} from './Utils/useGallery';
import Item from './Utils/Item';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AnimatedLottieView from 'lottie-react-native';
import LoaderModal from '../../components/common/LoaderModal';
import {useAppSelector} from '../../store/store';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';
import CustomHeader from '../../components/common/CustomHeader';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import NativeAdView from '../../hooks/Ads/Native/NativeAdView';

const GalleryViewerScreen = ({route, navigation}) => {
  const {type} = route.params;
  const {sortData, loading} = useGallery(type);
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);

  return (
    <ScreenSafeAreaView>
      {sortData?.length > 0 && sortData !== undefined && (
        <LoaderModal visible={loading} />
      )}
      <CustomHeader title={type} navigation={navigation} />
      {sortData?.length > 0 && sortData !== undefined ? (
        <FlatList
          data={sortData}
          renderItem={({item}) => (
            <Item data={item} type={type} navigation={navigation} />
          )}
          keyExtractor={item => item.mtime}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<BottomSpacing />}
          // ListHeaderComponent={<NativeAdView />}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedLottieView
            autoPlay
            loop
            source={require('../../assets/no_data.json')}
            speed={3}
          />
        </View>
      )}
      {isAdShown && (
        <View
          style={{
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isApplovin ? <ApplovinBannerAd /> : <BannerAds />}
        </View>
      )}
    </ScreenSafeAreaView>
  );
};

export default GalleryViewerScreen;
