import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Utils/ScreenSafeAreaView';
import { commonStyles } from '../../styles/commonStyles';
import images from '../../theme/constant/images';
import AnimatedLottieView from 'lottie-react-native';
import metrics from '../../theme/constant/metrics';
import useTheme from '../../hooks/theme/useTheme';
import HeaderText from '../../theme/Text/HeaderText';

const LoadingScreen = () => {
  const { backgroundColor } = useTheme();
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
