/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import CustomHeader from '../../components/common/CustomHeader';
import {useSettingDetails} from './Utils/useSettingsDetails';
import RequestCard from '../../components/molecules/cards/settings/RequestCard';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import ApplovinMREcAd from '../../hooks/Ads/Banner/ApplovinMREcAd';
import LargeBannerAd from '../../hooks/Ads/Banner/LargeBannerAd';
import {keyStrings} from '../../hooks/Firebase/keyStrings';
import {WebView} from 'react-native-webview';
import LoaderModal from '../../components/common/LoaderModal';

const SettingsDetailsScreen = ({route, navigation}) => {
  const {type} = route.params;
  const {
    handleSelectOption,
    selectedOption,
    onChangeTitleText,
    titleValue,
    onChangeDetailsText,
    detailsValue,
    onSendRequestPressHandler,
    isLoading,
    isAdShown,
    isApplovin,
    loading,
    setLoading,
    version,
  } = useSettingDetails(navigation);

  return (
    <ScreenSafeAreaView>
      {/* header */}
      <CustomHeader title={type} navigation={navigation} />
      {type === 'Help & Support' ? (
        <>
          <LoaderModal visible={loading} />
          <WebView
            source={{uri: version?.appPrivacyUrl}}
            style={{flex: 1}}
            onLoad={() => setLoading(false)}
          />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* container */}
          <View style={styles.container}>
            {/* request */}
            {type === 'Create Request' && (
              <RequestCard
                handleSelectOption={handleSelectOption}
                selectedOption={selectedOption}
                onChangeDetailsText={onChangeDetailsText}
                onChangeTitleText={onChangeTitleText}
                titleValue={titleValue}
                detailsValue={detailsValue}
                onSendRequestPressHandler={() =>
                  onSendRequestPressHandler(keyStrings.requestDoc)
                }
                isLoading={isLoading}
                titleText={'Please write a title...'}
                btnText={'Send Request'}
              />
            )}
            {type === 'Save Links' && (
              <RequestCard
                handleSelectOption={handleSelectOption}
                selectedOption={selectedOption}
                onChangeDetailsText={onChangeDetailsText}
                onChangeTitleText={onChangeTitleText}
                titleValue={titleValue}
                detailsValue={detailsValue}
                onSendRequestPressHandler={() =>
                  onSendRequestPressHandler(keyStrings.saveLinkDoc)
                }
                isLoading={isLoading}
                titleText={'Please write or paste the url...'}
                isPaste={true}
                btnText={'Save Link'}
              />
            )}
          </View>
          {/* MREc Ad */}
          {isAdShown && (
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              {isApplovin ? <ApplovinMREcAd /> : <LargeBannerAd />}
            </View>
          )}
          <BottomSpacing />
        </ScrollView>
      )}
    </ScreenSafeAreaView>
  );
};

export default SettingsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
