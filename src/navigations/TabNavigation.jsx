import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SCREENS from '../constants/screens.js';
import { HomeScreen, CategoriesScreen } from '../screens';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors.js';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          marginHorizontal: 20,
          borderRadius: 80,
          backgroundColor: COLORS.white,
          marginBottom: 20,
          paddingBottom: 0,
          paddingVertical: 8,
          height: 64,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.09,
              shadowRadius: 1,
            },
            android: {
              elevation: 2, // Тінь для Android
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

          // Return any component here!
          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.brand,
        tabBarInactiveTintColor: COLORS.secondaryText,
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.CATEGORY} component={CategoriesScreen} />
    </Tab.Navigator>
  );
}
