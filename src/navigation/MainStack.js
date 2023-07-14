import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import BottomNav from './BottomNav/BottomNav';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setIsLoading } from '../store/slices/loading/loadingSlice';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [timer, setTimer] = useState(3);
  //redux
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (timer > 0) {
  //     const timerId = setTimeout(() => {
  //       setTimer(timer - 1);
  //     }, 1000);
  //     return () => clearTimeout(timerId);
  //   } else {
  //     dispatch(setIsLoading(false));
  //   }
  // }, [timer]);

  const { isLoading } = useAppSelector(state => state.loading);
  //get the bottom tab
  function BottomTabs() {
    return <BottomNav />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading && (
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="BottomTab"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
