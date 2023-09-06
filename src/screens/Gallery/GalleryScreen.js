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
import useInterstitialAd from '../../hooks/Ads/Interstitials/useInterstitialAd';
import LoaderModal from '../../components/common/LoaderModal';

const GalleryScreen = ({navigation}) => {
  const {isAdShown} = useAppSelector(state => state.ads);
  const {play, isLoading, openAdInspector} = useInterstitialAd();
  const onItemPressHandler = type => {
    // openAdInspector();
    if (isAdShown) {
      play();
    }
    navigation.navigate(strings.GalleryViewerScreen, {type: type});
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
              <BannerAds />
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
            />
            <GalleryItem
              backgroundColor={colors.Grey}
              title={'Audio'}
              iconName={'music-video'}
              onPress={() => onItemPressHandler('audio')}
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
            />
            <GalleryItem
              backgroundColor={colors.Yellow}
              title={'Image'}
              iconName={'image'}
              onPress={() => onItemPressHandler('image')}
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
            />
            <GalleryItem
              backgroundColor={colors.Cyan}
              title={'Zip'}
              iconName={'folder'}
              onPress={() => onItemPressHandler('zip')}
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
            />
          </View>
        </View>
        <BottomSpacing />
      </ScrollView>
    </ScreenSafeAreaView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({});
