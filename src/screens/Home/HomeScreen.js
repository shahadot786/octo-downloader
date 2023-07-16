import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';
import images from '../../theme/constant/images';
import BigText from '../../theme/Text/BigText';
import metrics from '../../theme/constant/metrics';

const HomeScreen = () => {
  return (
    <ScreenSafeAreaView style={styles.container}>
      {/* main container */}
      <View style={styles.mainContainer}>
        {/* top view */}
        <View style={styles.topView}>
          {/* Image and text */}
          <View>
            <Image source={images.logo} style={styles.topLogoImage} />
            <TitleText text={'Octo Downloader'} />
          </View>
          {/* Promotion */}
          <View></View>
        </View>
        {/* home content */}
        <View></View>
      </View>
    </ScreenSafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 10,
  },
  topLogoImage: {
    width:
      metrics.screenWidth <= 380 ? 50 : metrics.screenWidth <= 600 ? 50 : 50,
    height:
      metrics.screenWidth <= 380 ? 50 : metrics.screenWidth <= 600 ? 50 : 50,
  },
});
