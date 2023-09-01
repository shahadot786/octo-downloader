import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

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
