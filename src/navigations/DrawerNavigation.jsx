import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SCREENS from '../constants/screens.js';
import { SettingsScreen } from '../screens';
import TabNavigation from './TabNavigation.jsx';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { themeColors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.TAB_ROOT}
      screenOptions={{
        headerTitle: '',
        headerTintColor: themeColors.primaryText,
        headerStyle: {
          backgroundColor: themeColors.background,
          shadowRadius: 0,
          shadowColor: '#000000',
          borderWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Drawer.Screen name={SCREENS.TAB_ROOT} component={TabNavigation} />
      <Drawer.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
