import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomNav from './BottomNav/BottomNav';
import strings from '../theme/constant/strings';
import CustomHeader from '../components/common/CustomHeader';
import MovieScreen from '../screens/Movie/MovieScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import {useSplash} from '../hooks/Utils/useSplash';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const {versionLoading, moviesLoading, promotionLoading} = useSplash();
  //get the bottom tab
  function BottomTabs() {
    return <BottomNav />;
  }
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
        <Stack.Screen
          name={strings.BottomTabScreen}
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={strings.MovieScreen}
          component={MovieScreen}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader title="Update Movies" navigation={navigation} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
