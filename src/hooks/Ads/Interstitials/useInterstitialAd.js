import {useEffect, useRef, useState} from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  MobileAds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const useInterstitialAd = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const interstitial = useRef(null);
  const unsubscribeLoaded = useRef(null);
  const unsubscribeClosed = useRef(null);

  const destroy = () => {
    if (unsubscribeLoaded.current) {
      unsubscribeLoaded.current();
    }
    if (unsubscribeClosed.current) {
      unsubscribeClosed.current();
    }
    interstitial.current = null;
    setIsLoaded(false);
    setIsLoading(false);
  };

  const play = () => {
    try {
      destroy();
      setIsLoading(true);

      interstitial.current = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      });

      unsubscribeLoaded.current = interstitial.current.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setIsLoaded(true);
          setIsLoading(false);
        },
      );

      unsubscribeClosed.current = interstitial.current.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          destroy();
        },
      );

      interstitial.current.load();
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      throw e;
    }
  };

  const openAdInspector = () => MobileAds().openAdInspector();

  useEffect(() => {
    if (isLoaded && interstitial.current) {
      interstitial.current.show();
    }
  }, [isLoaded]);

  useEffect(() => {
    return destroy;
  }, []);

  return {
    isLoading,
    isLoaded,
    play,
    openAdInspector,
  };
};

export default useInterstitialAd;
