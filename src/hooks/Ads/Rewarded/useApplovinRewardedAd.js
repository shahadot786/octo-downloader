import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';

const REWARDED_AD_UNIT_ID = Platform.select({
  android: '51197a5dbc23d84f',
  ios: 'ios_rewarded_ad_unit_ID',
});

const useApplovinRewardedAd = () => {
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [isRewardedAdReady, setIsRewardedAdReady] = useState(false);

  useEffect(() => {
    const rewardedAdLoadedListener = () => {
      setIsRewardedAdReady(true);
      setRetryAttempt(0);
    };

    const rewardedAdLoadFailedListener = () => {
      setRetryAttempt(retryAttempt + 1);
      const retryDelay = Math.pow(2, Math.min(6, retryAttempt));
      console.log(
        'Rewarded ad failed to load - retrying in ' + retryDelay + 's',
      );
      setTimeout(() => {
        loadRewardedAd();
      }, retryDelay * 1000);
    };

    AppLovinMAX.addRewardedAdLoadedEventListener(rewardedAdLoadedListener);
    AppLovinMAX.addRewardedAdLoadFailedEventListener(
      rewardedAdLoadFailedListener,
    );

    return () => {
      AppLovinMAX.removeRewardedAdLoadedEventListener(rewardedAdLoadedListener);
      AppLovinMAX.removeRewardedAdLoadFailedEventListener(
        rewardedAdLoadFailedListener,
      );
    };
  }, [retryAttempt]);

  const loadRewardedAd = () => {
    AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  };

  const showRewardedAd = async () => {
    try {
      if (isRewardedAdReady) {
        await AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
        loadRewardedAd();
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadRewardedAd();
  }, []);

  return {isRewardedAdReady, showRewardedAd};
};

export default useApplovinRewardedAd;
