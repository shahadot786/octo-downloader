// import firestore from '@react-native-firebase/firestore';
// const [data, setData] = useState(null);
// useEffect(() => {
//   getData();
// }, []);

// const getData = async () => {
//   try {
//     const tempData = await firestore()
//       .collection('octo-downloader-app')
//       .doc('zapoMtm0iVE2SkV8NmrE')
//       .get();

//     console.log(tempData?._data);
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 *banner add 
 * implement size 
 * 
// import { BannerAd, BannerAdSize, TestIds } from '@react-native-admob/admob';
// <BannerAd
//   size={BannerAdSize.MEDIUM_RECTANGLE}
//   unitId={TestIds.BANNER}
//   ref={bannerRef}
//   onAdFailedToLoad={error => console.error(error)}
// />;
// {
//   /* <Button title="Reload" onPress={() => bannerRef.current?.loadAd()} /> */
// }

/*
 *interstitial
 *rewarded
 */

// import AdMob, {
//   TestIds,
//   useInterstitialAd,
//   useRewardedAd,
// } from '@react-native-admob/admob';

// const { adLoaded, adDismissed, show } = useRewardedAd(TestIds.REWARDED);
// useEffect(() => {
//   AdMob.isTestDevice().then(result => console.log({ result }));
//   if (adDismissed) {
//     console.log('finished');
//   }
// }, [adDismissed]);

// <Button
//   title="Navigate to next screen"
//   onPress={() => {
//     if (adLoaded) {
//       show();
//       console.log('loaded');
//     } else {
//       console.log('finished2');
//     }
//   }}
// />;
