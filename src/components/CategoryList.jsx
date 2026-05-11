import CategoryItem from './CategoryItem';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

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

export default function CategoryList() {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <CategoryItem
          title={item.title}
          subtitle={item.subtitle}
          progress={item.progress}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 16 }}
    />
  );
}

const styles = StyleSheet.create({});
