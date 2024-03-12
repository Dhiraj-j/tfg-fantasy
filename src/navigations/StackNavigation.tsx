import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VerificationScreen from '@screens/Stack/VerificationScreen';

const {Screen, Navigator} = createStackNavigator();

const StackNavigation = () => {
  return (
    <Navigator>
      <Screen name="Verification" component={VerificationScreen} />
    </Navigator>
  );
};

export default StackNavigation;
