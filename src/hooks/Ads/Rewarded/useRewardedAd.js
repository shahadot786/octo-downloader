import {useEffect, useState} from 'react';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

export function useRewardedAd() {
  const [loaded, setLoaded] = useState(false);
  const [rewarded, setRewarded] = useState(null);

  useEffect(() => {
    const rewardedAd = RewardedAd.createForAdRequest(adUnitId);

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        setRewarded(rewardedAd);
      },
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        // console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewardedAd.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  return {
    loaded,
    showRewardedAd: () => {
      if (rewarded) {
        rewarded.show();
      }
    },
  };
}
