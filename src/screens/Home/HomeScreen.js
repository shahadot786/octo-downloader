/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, ScrollView, View, Pressable} from 'react-native';
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
import {useHome} from './Utils/useHome';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import AppExitModal from '../../components/templates/modal/AppExitModal';
import BigText from '../../theme/Text/BigText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import LoaderModal from '../../components/common/LoaderModal';

const HomeScreen = ({navigation}) => {
  const {
    isAdShown,
    isApplovin,
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
    initialMode,
    onItemPressHandler,
    isLoading,
  } = useHome(navigation);

  return (
    <ScreenSafeAreaView style={styles.container}>
      <LoaderModal visible={isLoading} />
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
            <View style={{marginVertical: 5}}>
              <Pressable
                onPress={() => onItemPressHandler('movies')}
                style={({pressed}) => [
                  {
                    height: 150,
                    backgroundColor: colors.Blue,
                    borderRadius: 10,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <Image
                  source={images.movies}
                  style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'center',
                    opacity: 0.4,
                    borderRadius: 10,
                  }}
                />
                <View style={{position: 'absolute', bottom: 10, left: 10}}>
                  <BigText text={'Movies'} />
                </View>
                <View style={{position: 'absolute', bottom: 10, right: 10}}>
                  <Ionicons
                    name="arrow-forward-circle-sharp"
                    color={initialMode ? colors.White : colors.Black}
                    size={18}
                  />
                </View>
              </Pressable>

              <View
                style={[
                  commonStyles.flexRow,
                  commonStyles.justifyBetween,
                  {marginVertical: 10},
                ]}>
                <Pressable
                  onPress={() => onItemPressHandler('videos')}
                  style={({pressed}) => [
                    {
                      width: '45%',
                      backgroundColor: colors.Green,
                      height: 200,
                      borderRadius: 10,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Image
                    source={images.videos}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'center',
                      opacity: 0.4,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{position: 'absolute', bottom: 10, left: 10}}>
                    <BigText text={'Videos'} />
                  </View>
                  <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    <Ionicons
                      name="arrow-forward-circle-sharp"
                      color={initialMode ? colors.White : colors.Black}
                      size={18}
                    />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => onItemPressHandler('audio')}
                  style={({pressed}) => [
                    {
                      width: '45%',
                      backgroundColor: colors.Warning,
                      height: 200,
                      borderRadius: 10,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Image
                    source={images.audioFiles}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'center',
                      opacity: 0.4,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{position: 'absolute', bottom: 10, left: 10}}>
                    <BigText text={"Audio's"} />
                  </View>
                  <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    <Ionicons
                      name="arrow-forward-circle-sharp"
                      color={initialMode ? colors.White : colors.Black}
                      size={18}
                    />
                  </View>
                </Pressable>
              </View>
              <Pressable
                onPress={() => onItemPressHandler('images')}
                style={({pressed}) => [
                  {
                    height: 150,
                    backgroundColor: colors.Yellow,
                    borderRadius: 10,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <Image
                  source={images.imageFiles}
                  style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'center',
                    opacity: 0.4,
                    borderRadius: 10,
                  }}
                />
                <View style={{position: 'absolute', bottom: 10, left: 10}}>
                  <BigText text={'Images'} />
                </View>
                <View style={{position: 'absolute', bottom: 10, right: 10}}>
                  <Ionicons
                    name="arrow-forward-circle-sharp"
                    color={initialMode ? colors.White : colors.Black}
                    size={18}
                  />
                </View>
              </Pressable>
              <View
                style={[
                  commonStyles.flexRow,
                  commonStyles.justifyBetween,
                  {marginVertical: 10},
                ]}>
                <Pressable
                  onPress={() => onItemPressHandler('pdf')}
                  style={({pressed}) => [
                    {
                      width: '45%',
                      backgroundColor: '#5ea04c',
                      height: 200,
                      borderRadius: 10,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Image
                    source={images.pdf}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'center',
                      opacity: 0.4,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{position: 'absolute', bottom: 10, left: 10}}>
                    <BigText text={'PDF'} />
                  </View>
                  <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    <Ionicons
                      name="arrow-forward-circle-sharp"
                      color={initialMode ? colors.White : colors.Black}
                      size={18}
                    />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => onItemPressHandler('zip')}
                  style={({pressed}) => [
                    {
                      width: '45%',
                      backgroundColor: '#254feb',
                      height: 200,
                      borderRadius: 10,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <Image
                    source={images.zip}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'center',
                      opacity: 0.4,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{position: 'absolute', bottom: 10, left: 10}}>
                    <BigText text={'Zip'} />
                  </View>
                  <View style={{position: 'absolute', bottom: 10, right: 10}}>
                    <Ionicons
                      name="arrow-forward-circle-sharp"
                      color={initialMode ? colors.White : colors.Black}
                      size={18}
                    />
                  </View>
                </Pressable>
              </View>
              <Pressable
                onPress={() => onItemPressHandler('software')}
                style={({pressed}) => [
                  {
                    height: 150,
                    backgroundColor: '#054a63',
                    borderRadius: 10,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}>
                <Image
                  source={images.software}
                  style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'center',
                    opacity: 0.4,
                    borderRadius: 10,
                  }}
                />
                <View style={{position: 'absolute', bottom: 10, left: 10}}>
                  <BigText text={'Software'} />
                </View>
                <View style={{position: 'absolute', bottom: 10, right: 10}}>
                  <Ionicons
                    name="arrow-forward-circle-sharp"
                    color={initialMode ? colors.White : colors.Black}
                    size={18}
                  />
                </View>
              </Pressable>
            </View>
            {/* bottom spacing */}
            <BottomSpacingNav />
            <BottomSpacing />
          </ScrollView>
        </View>
        <AppExitModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          exitAppPressHandler={exitAppPressHandler}
          cancelPressHandler={cancelPressHandler}
        />
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
    borderBottomColor: colors.Grey,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    paddingBottom: 5,
  },
  topLogoImage: {
    resizeMode: 'contain',
  },
});
