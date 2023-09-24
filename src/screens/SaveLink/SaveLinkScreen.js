/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Pressable} from 'react-native';
import {useSaveLink} from './Utils/useSaveLink';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import LoaderModal from '../../components/common/LoaderModal';
import AnimatedLottieView from 'lottie-react-native';
import colors from '../../theme/constant/colors';
import BigText from '../../theme/Text/BigText';
import DescriptionText from '../../theme/Text/DescriptionText';
import TitleText from '../../theme/Text/TitleText';
import BottomSpacingNav from '../../theme/Global/BottomSpacingNav';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';

const SaveLinkScreen = ({navigation}) => {
  const {
    data,
    loading,
    isLoading,
    onDownloadPressHandler,
    onViewPressHandler,
    isAdShown,
    isApplovin,
  } = useSaveLink(navigation);

  const renderListItem = ({item}) => (
    <View
      style={{
        margin: 10,
        borderWidth: 1,
        borderColor: colors.Grey,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
      }}>
      <TitleText text={`${item?.title}`} />
      {item?.details && (
        <DescriptionText
          text={`Details: ${item?.details}`}
          textStyle={{color: colors.Grey, marginVertical: 2}}
        />
      )}
      <DescriptionText
        text={`Type: ${item?.type}`}
        textStyle={{textTransform: 'capitalize', color: colors.Yellow}}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 30,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
          onPress={() => onDownloadPressHandler(item)}>
          <Ionicons name={'cloud-download'} size={25} color={colors.Primary} />
        </Pressable>
        {(item?.type === 'audio' ||
          item?.type === 'video' ||
          item?.type === 'image' ||
          item?.type === 'pdf') && (
          <Pressable
            style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}
            onPress={() => {
              onViewPressHandler(item);
            }}>
            <Ionicons name={'eye'} size={28} color={colors.Green} />
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <ScreenSafeAreaView>
      <LoaderModal visible={loading || isLoading} />
      <BigText
        text={'Save Links'}
        textStyle={{marginHorizontal: 15, marginTop: 20}}
      />
      {isAdShown && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {isApplovin ? <ApplovinBannerAd /> : <BannerAds />}
        </View>
      )}
      {data?.length <= 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedLottieView
            autoPlay
            loop
            source={require('../../assets/no_data.json')}
            speed={3}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<BottomSpacingNav />}
        />
      )}
    </ScreenSafeAreaView>
  );
};

export default SaveLinkScreen;
