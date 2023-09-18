/* eslint-disable react-hooks/exhaustive-deps */
import {PermissionsAndroid, Alert, Platform, Linking} from 'react-native';
import React, {useEffect} from 'react';
import localStorage from '../Utils/localStorage';
import {setPermission} from '../../store/slices/storage/storagePermissionSlice';
import {useAppDispatch} from '../../store/store';

const STORAGE_PERMISSION_KEY = '@StoragePermission';

export const StoragePermissionProvider = ({children}) => {
  const dispatch = useAppDispatch();

  const getStoragePermission = async () => {
    try {
      const storedPermission = await localStorage.getItem(
        STORAGE_PERMISSION_KEY,
      );

      if (
        storedPermission !== undefined &&
        storedPermission !== null &&
        storedPermission !== false
      ) {
        dispatch(setPermission(storedPermission === 'true'));
      } else {
        requestStoragePermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const setStoragePermissionAndStore = async permission => {
    dispatch(setPermission(permission));
    await localStorage.setItem(STORAGE_PERMISSION_KEY, permission.toString());
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'OctoDownloader needs access to your storage in order to save files.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setStoragePermissionAndStore(true);
        } else {
          setStoragePermissionAndStore(false);
          Alert.alert(
            'Storage Permission',
            'OctoDownloader needs access to your storage in order to save files.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      // Handle iOS permission request here
    }
  };

  useEffect(() => {
    getStoragePermission();
  }, []);

  return <>{children}</>;
};
