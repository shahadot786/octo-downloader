/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import useTheme from '../../hooks/theme/useTheme';
import {commonStyles} from '../../styles/commonStyles';
import ScreenSafeAreaView from '../../theme/Global/ScreenSafeAreaView';
import images from '../../theme/constant/images';
import BottomSpacing from '../../theme/Global/BottomSpacing';
import BigText from '../../theme/Text/BigText';
import DescriptionText from '../../theme/Text/DescriptionText';
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/constant/colors';
import TitleText from '../../theme/Text/TitleText';
import metrics from '../../theme/constant/metrics';
import {data} from './Utils/constant';

const SettingsScreen = () => {
  const {toggleTheme, initialMode} = useTheme();
  let version = DeviceInfo.getVersion();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleTheme();
  };
  return (
    <ScreenSafeAreaView style={commonStyles.justifyAlignCenter}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* container */}
        <View style={styles.container}>
          {/* logo */}
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              style={[styles.topLogoImage, commonStyles.bigImageSize]}
            />
            <BigText text={'Octo Downloader'} />
            <DescriptionText text={`Version: ${version}`} />
          </View>
          {/* settings items */}
          <View style={styles.settingsContainer}>
            {/* dark mode */}
            <View
              style={[
                styles.items,
                {
                  borderWidth: initialMode ? 1 : 0,
                  backgroundColor: initialMode
                    ? colors.Black
                    : colors.SoftWhite,
                },
              ]}>
              {/* left icon */}
              <Ionicons
                name={isEnabled ? 'moon' : 'moon-outline'}
                size={20}
                color={colors.Primary}
              />
              {/* title */}
              <TitleText text={'Dark Mode'} />
              <View style={{position: 'absolute', right: 10, top: 6}}>
                <Switch
                  trackColor={{false: colors.Grey, true: colors.Green}}
                  thumbColor={isEnabled ? colors.Primary : colors.SoftWhite}
                  ios_backgroundColor={colors.Grey}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
            {data.map((item, index) => {
              return (
                <Pressable
                  key={index.toString()}
                  style={({pressed}) => [
                    styles.items,
                    {
                      opacity: pressed ? 0.7 : 1,
                      borderWidth: initialMode ? 1 : 0,
                      backgroundColor: initialMode
                        ? colors.Black
                        : colors.SoftWhite,
                    },
                  ]}>
                  {/* left icon */}
                  <Ionicons
                    name={item?.iconName}
                    size={20}
                    color={colors.Primary}
                  />
                  {/* title */}
                  <TitleText text={item?.title} />
                  {/* right icon */}
                  <View style={{position: 'absolute', right: 10, top: 6}}>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={25}
                      color={colors.Primary}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
        <BottomSpacing />
      </ScrollView>
    </ScreenSafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLogoImage: {
    resizeMode: 'contain',
  },
  settingsContainer: {
    width: metrics.screenWidth - 15,
    marginVertical: 20,
  },
  items: {
    flexDirection: 'row',
    borderColor: colors.Grey,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    marginVertical: 5,
  },
});
