/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Pdf from 'react-native-pdf';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import metrics from '../../theme/constant/metrics';
import {useAppSelector} from '../../store/store';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';
import CustomHeader from '../../components/common/CustomHeader';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';
import BigText from '../../theme/Text/BigText';
import DescriptionText from '../../theme/Text/DescriptionText';
import formatBytes from '../../utils/formatBytes';
import formatTimestamp from '../../utils/formatTimestamp';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'react-native-media-console';
import AnimatedLottieView from 'lottie-react-native';

const renderActivityIndicator = progress => {
  const percentage = Math.floor(progress * 100) + '%';
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size={'large'} color={colors.Primary} />
      <TitleText text={percentage} />
    </View>
  );
};

const ItemDetails = ({title, time, size, iconName}) => (
  <View
    style={[
      styles.container,
      {justifyContent: 'center', alignItems: 'center'},
    ]}>
    <View style={styles.iconContainer}>
      <MaterialIcon name={iconName} size={140} color="#fff" />
    </View>
    <TitleText text={title} />
    <DescriptionText text={`Download at: ${formatTimestamp(time)}`} />
    <DescriptionText text={`Size: ${formatBytes(size)}`} />
  </View>
);

const ItemViewerScreen = ({route, navigation}) => {
  const {data, type} = route.params;
  const {isAdShown, isApplovin} = useAppSelector(state => state.ads);
  const [numberOfPages, setNumberOfPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoPlayer = useRef(null);

  let truncatedFilename = data?.name || data?.title;
  if (truncatedFilename?.length > 30) {
    truncatedFilename = truncatedFilename.substring(0, 30) + '...';
  } else if (truncatedFilename) {
    truncatedFilename = truncatedFilename;
  }

  const toggleFullScreen = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT,
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE,
      );
    }
    setIsFullScreen(!isFullScreen);
  };

  const onEndVideo = async () => {
    if (isFullScreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT,
      );
      setIsFullScreen(false);
      navigation.goBack();
    }
  };

  return (
    <ScreenSafeAreaView hidden={isFullScreen}>
      {!isFullScreen && (
        <CustomHeader
          title={truncatedFilename || 'Item Details'}
          navigation={navigation}
        />
      )}
      <View style={styles.container}>
        {(type === 'video' || type === 'audio') && (
          <VideoPlayer
            source={{uri: data?.path ? `file://${data.path}` : data?.url || ''}}
            isFullscreen={false}
            onBack={onEndVideo}
            rewindTime={10}
            showOnStart={true}
            showTimeRemaining={false}
            showHours={true}
            videoRef={videoPlayer}
            onEnterFullscreen={() => toggleFullScreen()}
            disableBack={!isFullScreen}
            onEnd={onEndVideo}
            controlAnimationTiming={350}
            controlTimeoutDelay={5000}
            seekColor={colors.Primary}
            showDuration={true}
            disableFullscreen={type === 'audio' ? true : false}
          />
        )}
        {type === 'audio' && (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.Grey,
              padding: 10,
              margin: 10,
              borderRadius: 10,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              top: '30%',
              left: 50,
            }}>
            <AnimatedLottieView
              autoPlay
              loop
              source={require('../.../../../assets/music.json')}
              style={styles.loaderStyle}
            />
            <TitleText text={truncatedFilename} />
          </View>
        )}
        {type === 'software' && (
          <ItemDetails
            iconName={'settings-applications'}
            title={truncatedFilename}
            time={data?.mtime?.toISOString()}
            size={data?.size}
          />
        )}
        {type === 'image' && (
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: data?.path ? `file://${data.path}` : data?.url || '',
              }}
              height={metrics.screenHeight - 150}
              width={metrics.screenWidth}
              resizeMode="contain"
            />
          </View>
        )}
        {type === 'pdf' && (
          <>
            <Pdf
              trustAllCerts={false}
              source={{
                uri: data?.path ? `file://${data.path}` : data?.url || '',
              }}
              onLoadComplete={setNumberOfPages}
              onPageChanged={setCurrentPage}
              onError={() => {}}
              onPressLink={() => {}}
              style={styles.pdf}
              showsVerticalScrollIndicator={true}
              fitWidth={true}
              renderActivityIndicator={renderActivityIndicator}
            />
            {currentPage && (
              <View style={styles.pageNumberContainer}>
                <BigText text={`${currentPage} / ${numberOfPages}`} />
              </View>
            )}
          </>
        )}
        {type === 'zip' && (
          <ItemDetails
            iconName={'library-books'}
            title={truncatedFilename}
            time={data?.mtime}
            size={data?.size}
          />
        )}
        {type === 'text' && (
          <ItemDetails
            iconName={'text-snippet'}
            title={truncatedFilename}
            time={data?.mtime}
            size={data?.size}
          />
        )}
      </View>
      {isAdShown && !isFullScreen && (
        <View style={styles.adContainer}>
          {isApplovin ? <ApplovinBannerAd /> : <BannerAds />}
        </View>
      )}
    </ScreenSafeAreaView>
  );
};

export default ItemViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  pdf: {
    flex: 1,
    height: metrics.screenHeight,
    width: metrics.screenWidth,
  },
  pageNumberContainer: {
    position: 'absolute',
    backgroundColor: colors.Primary,
    flexDirection: 'row',
    bottom: 10,
    left: '40%',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  adContainer: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {
    height: metrics.screenHeight / 4,
  },
});
