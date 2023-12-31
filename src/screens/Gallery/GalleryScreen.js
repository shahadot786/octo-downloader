/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import BigText from '../../theme/Text/BigText';
import GalleryItem from '../../components/molecules/cards/gallery/GalleryItem';
import {commonStyles} from '../../styles/commonStyles';
import colors from '../../theme/constant/colors';
import strings from '../../theme/constant/strings';
import {useAppSelector} from '../../store/store';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';
import LoaderModal from '../../components/common/LoaderModal';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import images from '../../theme/constant/images';
import useApplovinInterstitialAd from '../../hooks/Ads/Interstitials/useApplovinInterstitialAd';
import useInterstitialAd from '../../hooks/Ads/Interstitials/useInterstitialAd';

const GalleryScreen = ({navigation}) => {
  const {isAdShown, isApplovin, interAdCount} = useAppSelector(
    state => state.ads,
  );
  const {isInterstitialReady, showInterstitial} = useApplovinInterstitialAd();
  const {playInterstitialAd, isLoading} = useInterstitialAd();

  let _count = 0;
  const onItemPressHandler = type => {
    _count++;
    if (isAdShown) {
      if (_count % interAdCount === 0) {
        if (isApplovin) {
          if (isInterstitialReady) {
            handleShowInterstitial();
          } else {
            playInterstitialAd();
          }
        } else {
          playInterstitialAd();
        }
      }
    }
    navigation.navigate(strings.GalleryViewerScreen, {type: type});
  };

  const handleShowInterstitial = async () => {
    await showInterstitial();
  };
  return (
    <ScreenSafeAreaView style={styles.container}>
      <LoaderModal visible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: '5%', marginHorizontal: 15}}>
          <BigText text={'Gallery'} />
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
          <View
            style={[
              commonStyles.flexRow,
              {alignItems: 'center', justifyContent: 'center', gap: 10},
            ]}>
            <GalleryItem
              backgroundColor={colors.Green}
              title={'Video'}
              iconName={'video-collection'}
              onPress={() => onItemPressHandler('video')}
              imageSource={images.videoFiles}
            />
            <GalleryItem
              backgroundColor={colors.Grey}
              title={'Audio'}
              iconName={'music-video'}
              onPress={() => onItemPressHandler('audio')}
              imageSource={images.audio}
            />
          </View>
          <View
            style={[
              commonStyles.flexRow,
              {alignItems: 'center', justifyContent: 'center', gap: 10},
            ]}>
            <GalleryItem
              backgroundColor={colors.Warning}
              title={'Software'}
              iconName={'file-copy'}
              onPress={() => onItemPressHandler('software')}
              imageSource={images.software}
            />
            <GalleryItem
              backgroundColor={colors.Yellow}
              title={'Image'}
              iconName={'image'}
              onPress={() => onItemPressHandler('image')}
              imageSource={images.images}
            />
          </View>
          <View
            style={[
              commonStyles.flexRow,
              {alignItems: 'center', justifyContent: 'center', gap: 10},
            ]}>
            <GalleryItem
              backgroundColor={colors.Blue}
              title={'PDF'}
              iconName={'picture-as-pdf'}
              onPress={() => onItemPressHandler('pdf')}
              imageSource={images.pdf}
            />
            <GalleryItem
              backgroundColor={colors.Cyan}
              title={'Zip'}
              iconName={'folder'}
              onPress={() => onItemPressHandler('zip')}
              imageSource={images.zip}
            />
          </View>
          <View
            style={[
              commonStyles.flexRow,
              {alignItems: 'center', justifyContent: 'center', gap: 10},
            ]}>
            <GalleryItem
              backgroundColor={colors.Purple}
              title={'Text'}
              iconName={'text-snippet'}
              onPress={() => onItemPressHandler('text')}
              imageSource={images.text}
            />
          </View>
        </View>
        <BottomSpacing />
        <BottomSpacing />
      </ScrollView>
    </ScreenSafeAreaView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({});
