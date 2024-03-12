import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '@screens/BottomTabs/ProfileScreen';
import BottomNavigation from './BottomNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Bottom" component={BottomNavigation} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
