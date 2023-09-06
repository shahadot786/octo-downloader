/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './BottomNav/BottomNav';
import strings from '../theme/constant/strings';
import CustomHeader from '../components/common/CustomHeader';
import MovieScreen from '../screens/Movie/MovieScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import {useSplash} from '../hooks/Utils/useSplash';
import GalleryViewerScreen from '../screens/Gallery/GalleryViewerScreen';
import ItemViewerScreen from '../screens/Gallery/ItemViewerScreen';
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
  const {versionLoading, moviesLoading, promotionLoading} = useSplash();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {(versionLoading || moviesLoading || promotionLoading) && (
          <Stack.Screen
            name={strings.SplashScreen}
            component={SplashScreen}
            options={{headerShown: false}}
          />
        )}
        {/* Pass the BottomTabs component as the component prop */}
        <Stack.Screen
          name={strings.BottomTabScreen}
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.MovieScreen}
          component={MovieScreen}
          options={({navigation}) => ({
            header: props => (
              <CustomHeaderHandler
                title={'Update Movies'}
                navigation={navigation}
              />
            ),
          })}
        />
        <Stack.Screen
          name={strings.GalleryViewerScreen}
          component={GalleryViewerScreen}
          options={({navigation}) => ({
            header: props => (
              <CustomHeaderHandler title={'Gallery'} navigation={navigation} />
            ),
          })}
        />
        <Stack.Screen
          name={strings.ItemViewerScreen}
          component={ItemViewerScreen}
          // options={{headerShown: false}}
          options={({navigation}) => ({
            header: props => (
              <CustomHeaderHandler title={'Details'} navigation={navigation} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
