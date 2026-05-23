import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from '../constants/screens.js';
import { HomeScreen, CategoriesScreen, StatisticsScreen } from '../screens';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors.js';
import { Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

const iconProps = {
  [SCREENS.HOME]: 'fmd-good',
  [SCREENS.CATEGORY]: 'commute',
  [SCREENS.STATISTICS]: 'bookmark',
};

const createTabIcon = routeName =>
  function TabIcon({ color, size }) {
    return (
      <MaterialIcon name={iconProps[routeName]} size={size} color={color} />
    );
  };

const HomeIcon = createTabIcon(SCREENS.HOME);
const CategoriesIcon = createTabIcon(SCREENS.CATEGORY);
const StatisticsIcon = createTabIcon(SCREENS.STATISTICS);

export default function TabNavigation() {
  const { theme, themeColors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        sceneStyle: {},
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: 20,
          borderRadius: 80,
          backgroundColor: theme === 'light' ? COLORS.white : '#1e1e1e',
          marginBottom: 20,
          paddingBottom: 0,
          paddingVertical: 8,
          height: 64,
          borderTopWidth: 0,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: theme === 'light' ? 0.09 : 0.3,
              shadowRadius: 1,
            },
            android: {
              elevation: theme === 'light' ? 2 : 4,
            },
          }),
        },
        tabBarItemStyle: {
          flex: 1,
        },
        tabBarActiveTintColor: COLORS.brand,
        tabBarInactiveTintColor: themeColors.secondaryText,
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name={SCREENS.CATEGORY}
        component={CategoriesScreen}
        options={{ tabBarIcon: CategoriesIcon }}
      />
      <Tab.Screen
        name={SCREENS.STATISTICS}
        component={StatisticsScreen}
        options={{ tabBarIcon: StatisticsIcon }}
      />
    </Tab.Navigator>
  );
}

const styles = {
  sceneContainer: {
    backgroundColor: 'transparent',
  },
};
