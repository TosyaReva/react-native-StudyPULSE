/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Button from './src/components/Button.jsx';
import Logo from './src/components/Logo.jsx';
import CustomText from './src/components/CustomText.jsx';
import Stat from './src/components/Stat.jsx';
import SearchInput from './src/components/SearchInput.jsx';
import CategoryList from './src/components/CategoryList.jsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: safeAreaInsets.bottom,
        paddingTop: safeAreaInsets.top,
        paddingHorizontal: safeAreaInsets.left,
      }}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CustomText type="title">Button Primary</CustomText>
        <Button
          title="Get Started"
          onPress={() => console.log('Pressed')}
          primary
        />
        <CustomText type="subtitle">Button Secondary</CustomText>
        <Button
          title="Continue as Guest"
          onPress={() => console.log('Pressed')}
        />
        <CustomText type="subtitle">Logo</CustomText>
        <Logo />
        <CustomText type="subtitle">Stat items for main screen</CustomText>
        <Stat icon="local-fire-department" title="4" subtitle="day streak" />
        <Stat
          icon="access-time"
          iconActive
          title="5 min"
          subtitle="next break"
        />
        <CustomText type="subtitle">SearchInput</CustomText>
        <SearchInput
          callback={value => console.log(value)}
          placeholder="Search categories..."
        />
      </ScrollView>
      <CustomText type="subtitle">Cetegories List</CustomText>
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginBottom: 32,
    gap: 8,
  },
});

export default App;
