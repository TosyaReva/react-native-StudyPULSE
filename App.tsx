/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StyleSheet,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import StackNavigation from './src/navigations/StackNavigation';
import FocusTimerHost from './src/components/FocusTimerHost';

import { ThemeProvider } from './src/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <FocusTimerHost />
      <StackNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
