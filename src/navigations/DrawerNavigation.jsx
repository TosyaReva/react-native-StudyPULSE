import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SCREENS from '../constants/screens.js';
import { HomeScreen, UI_kit } from '../screens';
import TabNavigation from './TabNavigation.jsx';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.TAB_ROOT}
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          height: 48,
          backgroundColor: '#00000000',
          shadowRadius: 0,
          shadowColor: '#000000',
          borderWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Drawer.Screen name={SCREENS.TAB_ROOT} component={TabNavigation} />
      <Drawer.Screen name={SCREENS.UI_KIT} component={UI_kit} />
    </Drawer.Navigator>
  );
}
