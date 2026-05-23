import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SCREENS from '../constants/screens.js';
import { SettingsScreen } from '../screens';
import TabNavigation from './TabNavigation.jsx';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors.js';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const { theme, themeColors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.TAB_ROOT}
      screenOptions={{
        drawerActiveTintColor: COLORS.brand,
        drawerInactiveTintColor: themeColors.secondaryText,
        drawerActiveBackgroundColor:
          theme === 'light' ? 'rgba(109, 92, 253, 0.1)' : 'rgba(109, 92, 253, 0.18)',
        drawerStyle: {
          backgroundColor:
            theme === 'light' ? COLORS.white : themeColors.background,
        },
        drawerLabelStyle: {
          color: themeColors.primaryText,
        },
        sceneContainerStyle: {
          backgroundColor:
            theme === 'light' ? COLORS.background : themeColors.background,
        },
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
      <Drawer.Screen
        name={SCREENS.TAB_ROOT}
        component={TabNavigation}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
