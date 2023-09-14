import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';

const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: 'd00adb19d092912f',
  ios: 'ios_interstitial_ad_unit_ID',
});

const useApplovinInterstitialAd = () => {
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [isInterstitialReady, setIsInterstitialReady] = useState(false);

  useEffect(() => {
    const interstitialLoadedListener = () => {
      setIsInterstitialReady(true);
      setRetryAttempt(0);
    };

    const interstitialLoadFailedListener = () => {
      setRetryAttempt(retryAttempt + 1);
      const retryDelay = Math.pow(2, Math.min(6, retryAttempt));
      //   console.log(
      //     'Interstitial ad failed to load - retrying in ' + retryDelay + 's',
      //   );
      setTimeout(() => {
        loadInterstitial();
      }, retryDelay * 1000);
    };

    AppLovinMAX.addInterstitialLoadedEventListener(interstitialLoadedListener);
    AppLovinMAX.addInterstitialLoadFailedEventListener(
      interstitialLoadFailedListener,
    );

    // Clean up event listeners when the component unmounts
    return () => {
      AppLovinMAX.removeInterstitialLoadedEventListener(
        interstitialLoadedListener,
      );
      AppLovinMAX.removeInterstitialLoadFailedEventListener(
        interstitialLoadFailedListener,
      );
    };
  }, [retryAttempt]);

  const loadInterstitial = () => {
    AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
  };

  const showInterstitial = async () => {
    try {
      if (isInterstitialReady) {
        await AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
        loadInterstitial();
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadInterstitial();
  }, []);

  return {isInterstitialReady, showInterstitial};
};

export default useApplovinInterstitialAd;
