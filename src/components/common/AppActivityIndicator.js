import {ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../../theme/constant/colors';
const AppActivityIndicator = props => {
  return <ActivityIndicator size="large" color={colors.Primary} {...props} />;
};

export default AppActivityIndicator;
