import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import metrics from '../../../theme/constant/metrics';
import useTheme from '../../theme/useTheme';

const adUnitId = '79732273db5df1d8';
const ApplovinBannerAd = () => {
  const {backgroundColor} = useTheme();
  return (
    <AppLovinMAX.AdView
      adUnitId={adUnitId}
      adFormat={AppLovinMAX.AdFormat.BANNER}
      adaptiveBannerEnabled={false}
      autoRefresh={true}
      style={[styles.banner, {backgroundColor: backgroundColor}]}
      // onAdLoaded={adInfo => {
      //   console.log('Banner ad loaded from ' + adInfo.networkName);
      // }}
      // onAdLoadFailed={errorInfo => {
      //   console.log(
      //     'Banner ad failed to load with error code ' +
      //       errorInfo.code +
      //       ' and message: ' +
      //       errorInfo.message,
      //   );
      // }}
      // onAdClicked={() => {
      //   console.log('Banner ad clicked');
      // }}
      // onAdExpanded={() => {
      //   console.log('Banner ad expanded');
      // }}
      // onAdCollapsed={() => {
      //   console.log('Banner ad collapsed');
      // }}
      // onAdRevenuePaid={adInfo => {
      //   console.log('Banner ad revenue paid: ' + adInfo.revenue);
      // }}
    />
  );
};

const styles = StyleSheet.create({
  banner: {
    // position: 'absolute',
    width: metrics.screenWidth,
    height: 'auto',
    bottom: Platform.select({
      ios: 36, // For bottom safe area
      android: 0,
    }),
    marginTop: 5,
  },
});

export default ApplovinBannerAd;
