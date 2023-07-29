import React from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const BannerAds = () => {
  return (
    <BannerAd
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      unitId={TestIds.BANNER}
    />
  );
};

export default BannerAds;
