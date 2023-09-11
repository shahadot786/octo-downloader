import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1183995713269973/6046795990';

const BannerAds = () => {
  return (
    <BannerAd
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      unitId={adUnitId}
    />
  );
};

export default BannerAds;
