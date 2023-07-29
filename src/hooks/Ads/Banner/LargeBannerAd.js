import React from 'react';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const LargeBannerAd = () => {
  return (
    <BannerAd
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      size={BannerAdSize.MEDIUM_RECTANGLE}
      unitId={TestIds.BANNER}
    />
  );
};

export default LargeBannerAd;
