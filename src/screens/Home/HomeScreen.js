/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';
import images from '../../theme/constant/images';
import {commonStyles} from '../../styles/commonStyles';
import DescriptionText from '../../theme/Text/DescriptionText';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';
import HomePromotion from '../../components/molecules/cards/promotion/HomePromotion';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import AppUpdateModal from '../../components/templates/modal/AppUpdateModal';
import {useHome} from './Utils/useHome';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';

const HomeScreen = () => {
  const {isAdShown, isApplovin} = useHome();

  return (
    <ScreenSafeAreaView style={styles.container}>
      {/* main container */}
      <View style={styles.mainContainer}>
        {/* top view */}
        <View style={styles.topView}>
          <View style={[styles.topCardView, commonStyles.flexRow]}>
            {/* Image and text */}
            <View style={{width: '35%'}}>
              <Image
                source={images.logo}
                style={[styles.topLogoImage, commonStyles.smallImageSize]}
              />
              <TitleText text={'Octo Downloader'} />
              <DescriptionText
                text={'Download anything anytime..'}
                textStyle={styles.desText}
              />
            </View>
            {/* Promotion */}
            <HomePromotion />
          </View>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <View style={{}}>
              <View
                style={{
                  height: 150,
                  backgroundColor: colors.Blue,
                  borderRadius: 10,
                }}
              />

              <View
                style={[
                  commonStyles.flexRow,
                  commonStyles.justifyBetween,
                  {marginVertical: 10},
                ]}>
                <View
                  style={{
                    width: '45%',
                    backgroundColor: colors.Green,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    width: '45%',
                    backgroundColor: colors.Warning,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  height: 150,
                  backgroundColor: colors.Yellow,
                  borderRadius: 10,
                }}
              />
              <View
                style={[
                  commonStyles.flexRow,
                  commonStyles.justifyBetween,
                  {marginVertical: 10},
                ]}>
                <View
                  style={{
                    width: '45%',
                    backgroundColor: colors.Green,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    width: '45%',
                    backgroundColor: colors.Warning,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            {/* bottom spacing */}
            <BottomSpacingNav />
            <BottomSpacing />
          </ScrollView>
        </View>
        <AppUpdateModal />
      </View>
    </ScreenSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  desText: {
    marginTop: 5,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  scrollView: {},
  topCardView: {
    justifyContent: 'space-between',
    // borderBottomColor: colors.Grey,
    // borderBottomWidth: 1,
    // borderStyle: 'dotted',
  },
  topLogoImage: {
    resizeMode: 'contain',
  },
  topView: {},
});
