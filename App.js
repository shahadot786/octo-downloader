import { View, Text } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './src/navigation/Routes';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
