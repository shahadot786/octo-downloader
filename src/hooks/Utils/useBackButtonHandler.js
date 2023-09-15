/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import RNFS from 'react-native-fs';

const useBackButtonHandler = navigation => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cachePath = RNFS.CachesDirectoryPath;

  const handleBackButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      setIsModalVisible(true);
      return true;
    }
  };

  const exitAppPressHandler = () => {
    BackHandler.exitApp();
    setIsModalVisible(false);
    RNFS.readDir(cachePath)
      .then(files => {
        files.forEach(file => {
          RNFS.unlink(file.path)
            .then(() => {
              //   console.log(`Deleted: ${file.path}`);
            })
            .catch(error => {
              console.error(`Error deleting file: ${file.path}`, error);
            });
        });
      })
      .catch(error => {
        console.error('Error reading cache directory:', error);
      });
  };

  const cancelPressHandler = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return {
    isModalVisible,
    setIsModalVisible,
    exitAppPressHandler,
    cancelPressHandler,
  };
};

export default useBackButtonHandler;
