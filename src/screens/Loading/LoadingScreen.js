import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import { commonStyles } from '../../styles/commonStyles';
import images from '../../theme/constant/images';
import AnimatedLottieView from 'lottie-react-native';
import metrics from '../../theme/constant/metrics';
import useTheme from '../../hooks/theme/useTheme';
import HeaderText from '../../theme/Text/HeaderText';
import mobileAds from 'react-native-google-mobile-ads';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import DeviceInfo from 'react-native-device-info';

const LoadingScreen = () => {
  const { backgroundColor } = useTheme();
  let version = DeviceInfo.getVersion();
  console.log({ version });
  // const loadAdConsent = async () => {
  //   const consentInfo = await AdsConsent.requestInfoUpdate();

  //   if (
  //     consentInfo.isConsentFormAvailable &&
  //     consentInfo.status === AdsConsentStatus.REQUIRED
  //   ) {
  //     const { status } = await AdsConsent.showForm();
  //   }
  // };
  const initialGoogleAds = () => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
        // console.log(adapterStatuses);
      });
  };
  // .setRequestConfiguration({
  //   // Update all future requests suitable for parental guidance
  //   maxAdContentRating: MaxAdContentRating.PG,

  //   // Indicates that you want your content treated as child-directed for purposes of COPPA.
  //   tagForChildDirectedTreatment: true,

  //   // Indicates that you want the ad request to be handled in a
  //   // manner suitable for users under the age of consent.
  //   tagForUnderAgeOfConsent: true,

  //   // An array of test device IDs to allow.
  //   testDeviceIdentifiers: ['EMULATOR'],
  // })
  // .then(() => {
  //   // Request config successfully set!
  // });
  useEffect(() => {
    initialGoogleAds();
    // loadAdConsent();
  }, []);

  return (
    <ScreenSafeAreaView style={[backgroundColor, commonStyles.alignCenter]}>
      <View style={styles.marginVertical}>
        <View style={styles.logoContainer}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={images.logo} />
          </View>
          <View style={commonStyles.justifyAlignCenter}>
            <HeaderText text={'Octo Downloader'} />
          </View>
          {/* loader animation */}
          <View style={styles.loaderContainer}>
            <AnimatedLottieView
              autoPlay
              loop
              source={require('../../assets/loader.json')}
              style={styles.loaderStyle}
            />
          </View>
        </View>
      </View>
    </ScreenSafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  imageView: {
    width:
      metrics.screenWidth <= 380 ? 140 : metrics.screenWidth <= 600 ? 180 : 200,
    height:
      metrics.screenWidth <= 380 ? 140 : metrics.screenWidth <= 600 ? 180 : 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    bottom: 10,
    position: 'absolute',
  },
  loaderStyle: {
    height: 100,
  },
});
