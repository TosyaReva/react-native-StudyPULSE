import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {
  SplashScreen,
  HomeScreen,
  UI_kit,
  ActiveCategoryScreen,
} from '../screens';
import DrawerNavigation from './DrawerNavigation.jsx';
import SCREENS from '../constants/screens.js';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'transparent',
  },
};

export default function StackNavigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={SCREENS.SPLASH_SCREEN}
        screenOptions={{
          headerShown: false,
          // cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      >
        <Stack.Screen
          name={SCREENS.SPLASH_SCREEN}
          component={SplashScreen}
          options={{
            gestureEnabled: false,
            animationEnabled: false,
          }}
        />
        <Stack.Screen name={SCREENS.DRAWER_ROOT} component={DrawerNavigation} />
        <Stack.Screen
          name={SCREENS.ACTIVE_CATEGORY}
          component={ActiveCategoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
