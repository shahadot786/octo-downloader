/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import metrics from '../../theme/constant/metrics';
import Pdf from 'react-native-pdf';
import {useAppSelector} from '../../store/store';
import BannerAds from '../../hooks/Ads/Banner/BannerAds';
import CustomHeader from '../../components/common/CustomHeader';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';
import BigText from '../../theme/Text/BigText';
import DescriptionText from '../../theme/Text/DescriptionText';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import formatBytes from '../../utils/formatBytes';
import formatTimestamp from '../../utils/formatTimestamp';

const renderActivityIndicator = progress => {
  const percentage = Math.floor(progress * 100) + '%';
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <ActivityIndicator size={'large'} color={colors.Primary} />
      <TitleText text={percentage} />
    </View>
  );
};

const ItemDetails = ({title, time, size, iconName}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* icon */}
      <MaterialIcon name={iconName} size={100} color="#fff" />
      {/* title */}
      <TitleText text={title} />
      {/* time */}
      <DescriptionText text={`Download at: ${formatTimestamp(time)}`} />
      {/*size  */}
      <DescriptionText text={`Size: ${formatBytes(size)}`} />
    </View>
  );
};

const ItemViewerScreen = ({route, navigation}) => {
  const {data, type} = route.params;
  const {isAdShown} = useAppSelector(state => state.ads);
  const [numberOfPages, setNumberOfPages] = useState();
  const [currentPage, setCurrentPage] = useState();

  let truncatedFilename = '';
  const formattedFilename = data?.name.split('.')[0].replace(/_/g, ' ');
  if (formattedFilename.length > 30) {
    truncatedFilename = formattedFilename.substring(0, 30) + '...';
  } else {
    truncatedFilename = formattedFilename;
  }

  return (
    <ScreenSafeAreaView>
      <CustomHeader title={truncatedFilename} navigation={navigation} />
      <View style={{flex: 1}}>
        {/* audio */}
        {/* video */}
        {/* software */}
        {type === 'software' && (
          <ItemDetails
            iconName={'settings-applications'}
            title={truncatedFilename}
            time={data?.mtime}
            size={data?.size}
          />
        )}
        {/* image */}
        {type === 'image' && (
          <View style={{flex: 1, alignItems: 'center', marginVertical: 10}}>
            <Image
              source={{uri: `file://${data?.path}`}}
              height={metrics.screenHeight - 150}
              width={metrics.screenWidth}
              resizeMode="contain"
            />
          </View>
        )}
        {/* pdf */}
        {type === 'pdf' && (
          <>
            <Pdf
              trustAllCerts={false}
              source={{uri: `file://${data?.path}`}}
              onLoadComplete={pages => {
                setNumberOfPages(pages);
              }}
              onPageChanged={page => {
                setCurrentPage(page);
              }}
              onError={error => {}}
              onPressLink={uri => {}}
              style={styles.pdf}
              showsVerticalScrollIndicator={true}
              fitWidth={true}
              renderActivityIndicator={progress =>
                renderActivityIndicator(progress)
              }
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: colors.Primary,
                flexDirection: 'row',
                bottom: 80,
                left: '40%',
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <BigText text={`${currentPage} / ${numberOfPages}`} />
            </View>
          </>
        )}
        {/* zip */}
        {type === 'zip' && (
          <ItemDetails
            iconName={'library-books'}
            title={truncatedFilename}
            time={data?.mtime}
            size={data?.size}
          />
        )}
        {/* text */}
        {type === 'text' && (
          <ItemDetails
            iconName={'text-snippet'}
            title={truncatedFilename}
            time={data?.mtime}
            size={data?.size}
          />
        )}
      </View>
      {isAdShown && (
        <View
          style={{
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BannerAds />
        </View>
      )}
    </ScreenSafeAreaView>
  );
};

export default ItemViewerScreen;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    height: metrics.screenHeight,
    width: metrics.screenWidth,
  },
});
