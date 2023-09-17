import React from 'react';
import MainStack from './MainStack';
import ForceUpdates from '../hooks/Helper/ForceUpdate/ForceUpdates';

const Routes = () => {
  ForceUpdates();
  return <MainStack />;
};

export default Routes;
