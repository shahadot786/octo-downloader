import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';

export const checkPermissions = async permissions => {
  try {
    const requiredPermissions = permissions.filter(
      permission =>
        permission.toString() !== PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    );

    const results = await requestMultiple(requiredPermissions);

    let allPermissionsGranted = true;

    for (let permission in requiredPermissions) {
      if (!(results[requiredPermissions[permission]] === RESULTS.GRANTED)) {
        allPermissionsGranted = false;
      }
    }

    return allPermissionsGranted;
    // }
  } catch (error) {
    return false;
  }
};
