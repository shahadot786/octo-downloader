import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1183995713269973/3124871763';

const LargeBannerAd = () => {
  return (
    <BannerAd
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      size={BannerAdSize.MEDIUM_RECTANGLE}
      unitId={adUnitId}
    />
  );
};

export default LargeBannerAd;
