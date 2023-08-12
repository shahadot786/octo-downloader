import React from 'react';
import {Provider} from 'react-redux';
import Routes from './src/navigation/Routes';
import store from './src/store/store';
import {ToastProvider} from 'react-native-toast-notifications';
import {StoragePermissionProvider} from './src/hooks/Permission/StoragePermissionProvider';

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <StoragePermissionProvider>
          <Routes />
        </StoragePermissionProvider>
      </ToastProvider>
    </Provider>
  );
};

export default App;
