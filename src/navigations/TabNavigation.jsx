import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from '../constants/screens.js';
import { HomeScreen, CategoriesScreen } from '../screens';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors.js';
import { Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { theme, themeColors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      screenOptions={({ route }) => ({
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
          borderTopWidth: 0, // Прибираємо лінію зверху для темної теми
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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === SCREENS.HOME) {
            iconName = 'fmd-good';
          } else if (route.name === SCREENS.CATEGORY) {
            iconName = 'commute';
          }

          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.brand,
        tabBarInactiveTintColor: themeColors.secondaryText,
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.CATEGORY} component={CategoriesScreen} />
    </Tab.Navigator>
  );
}
