import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button.jsx';
import Logo from '../components/Logo.jsx';
import CustomText from '../components/CustomText.jsx';
import Stat from '../components/Stat.jsx';
import SearchInput from '../components/SearchInput.jsx';
import CategoryList from '../components/CategoryList.jsx';
import ScreenComponent from './ScreenComponent.jsx';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'React Native',
    subtitle: '12h this week',
    progress: 0.3,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'English',
    subtitle: '5h this week',
    progress: 0.7,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'UI Design',
    subtitle: '8h this week',
    progress: 0.85,
  },
];

export default function UI_kit() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenComponent
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
      <CategoryList data={DATA} />
    </ScreenComponent>
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
