import React, { useRef } from 'react';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob';

const BannerAds = () => {
  const bannerRef = useRef();
  const onLoadAgainAd = () => {
    bannerRef.current?.loadAd();
  };
  return (
    <BannerAd
      size={BannerAdSize.ADAPTIVE_BANNER}
      unitId={TestIds.BANNER}
      ref={bannerRef}
      onAdFailedToLoad={onLoadAgainAd}
    />
  );
};

export default BannerAds;
