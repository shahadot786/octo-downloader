import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import Splash from './src/screens/Splash/Utils/Splash';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  );
};

export default App;
