/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './BottomNav/BottomNav';
import strings from '../theme/constant/strings';
import CustomHeader from '../components/common/CustomHeader';
import GalleryViewerScreen from '../screens/Gallery/GalleryViewerScreen';
import ItemViewerScreen from '../screens/Gallery/ItemViewerScreen';
import SaveLinkScreen from '../screens/SaveLink/SaveLinkScreen';
import SettingsDetailsScreen from '../screens/SettingsDetails/SettingsDetailsScreen';
import HomeItemListScreen from '../screens/HomeItemList/HomeItemListScreen';
import HomeItemListDetailsScreen from '../screens/HomeItemListDetails/HomeItemListDetailsScreen';

const Stack = createNativeStackNavigator();
// bottom navigation
function BottomTabs() {
  return <BottomNav />;
}
//custom header for navigation
function CustomHeaderHandler(props) {
  return <CustomHeader title={props.title} navigation={props.navigation} />;
}

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={strings.BottomTabScreen}
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.GalleryViewerScreen}
          component={GalleryViewerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.ItemViewerScreen}
          component={ItemViewerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.SaveLinkScreen}
          component={SaveLinkScreen}
          options={({navigation}) => ({
            header: props => (
              <CustomHeaderHandler
                title={'Saved Links'}
                navigation={navigation}
              />
            ),
          })}
        />
        <Stack.Screen
          name={strings.SettingsDetailsScreen}
          component={SettingsDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.HomeItemListScreen}
          component={HomeItemListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.HomeItemListDetailsScreen}
          component={HomeItemListDetailsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
