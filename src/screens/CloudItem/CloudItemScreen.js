/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, View, Pressable} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/common/CustomHeader';
import {useCloudItem} from './Utils/useCloudItem';
import TitleText from '../../theme/Text/TitleText';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import metrics from '../../theme/constant/metrics';
import BigText from '../../theme/Text/BigText';
import colors from '../../theme/constant/colors';
import useTheme from '../../hooks/theme/useTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApplovinBannerAd from '../../hooks/Ads/Banner/ApplovinBannerAd';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';
import LoaderModal from '../../components/common/LoaderModal';

const RenderCloudItem = ({
  item,
  onDownloadPressHandler,
  onViewPressHandler,
}) => {
  const {initialMode} = useTheme();
  return (
    <View style={{margin: 15, alignItems: 'center'}}>
      {(item?.type === 'movies' ||
        item.type === 'video' ||
        item.type === 'image' ||
        item.type === 'pdf' ||
        item.type === 'audio' ||
        item.type === 'software' ||
        item?.type === 'zip') && (
        <Image
          source={{
            uri: item?.image ? item?.image : item?.url || '',
          }}
          style={{
            width: metrics.screenWidth - 50,
            height: metrics.screenHeight / 1.5,
            borderRadius: 20,
            resizeMode: 'cover',
            opacity: initialMode ? 0.6 : 0.8,
          }}
        />
      )}
      {item?.rating && (
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 20,
            backgroundColor: colors.Grey,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            paddingHorizontal: 5,
            opacity: 0.7,
          }}>
          <BigText
            text={item?.rating}
            textStyle={{fontSize: 20, color: colors.Yellow}}
          />
        </View>
      )}
      {item?.year && (
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 10,
            backgroundColor: colors.Grey,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: 5,
            opacity: 0.7,
          }}>
          <BigText text={item?.year} textStyle={{fontSize: 20}} />
        </View>
      )}
      {item?.name && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: colors.Grey,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 5,
            opacity: 0.7,
          }}>
          <TitleText
            text={item?.name?.substring(0, 30)}
            textStyle={{
              fontSize: 20,
              opacity: 0.6,
              textTransform: 'capitalize',
            }}
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 10,
          backgroundColor: colors.SoftBlack,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          paddingHorizontal: 5,
        }}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.4 : 1}]}
          onPress={() => onDownloadPressHandler(item)}>
          <Ionicons name={'cloud-download'} size={30} color={colors.Primary} />
        </Pressable>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          left: 10,
          backgroundColor: colors.SoftBlack,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          paddingHorizontal: 5,
        }}>
        {(item?.type === 'audio' ||
          item?.type === 'video' ||
          item?.type === 'image' ||
          item?.type === 'pdf') && (
          <Pressable
            style={({pressed}) => [{opacity: pressed ? 0.4 : 1}]}
            onPress={() => {
              onViewPressHandler(item);
            }}>
            <Ionicons name={'eye'} size={35} color={colors.Green} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const CloudItemScreen = ({navigation, route}) => {
  const {type} = route.params;
  const {
    sortedData,
    onDownloadPressHandler,
    onViewPressHandler,
    isAdShown,
    isApplovin,
    isLoading,
  } = useCloudItem({
    navigation,
    type,
  });

  return (
    <ScreenSafeAreaView>
      <CustomHeader title={type} navigation={navigation} />
      <LoaderModal visible={isLoading} />
      <FlatList
        data={sortedData}
        keyExtractor={item => item?._id}
        renderItem={({item}) => (
          <RenderCloudItem
            item={item}
            onDownloadPressHandler={onDownloadPressHandler}
            onViewPressHandler={onViewPressHandler}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<BottomSpacing />}
      />
      {isAdShown && <>{isApplovin ? <ApplovinBannerAd /> : <BannerAds />}</>}
    </ScreenSafeAreaView>
  );
};

export default CloudItemScreen;
