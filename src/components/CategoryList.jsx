import CategoryItem from './CategoryItem';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import SCREENS from '../constants/screens.js';

export default function CategoryList({ data, navigation }) {
  const handleOnPress = item => {
    navigation.navigate(SCREENS.ACTIVE_CATEGORY, item);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CategoryItem
          title={item.title}
          icon={item.icon}
          color={item.color}
          onPress={() => handleOnPress(item)}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 16 }}
    />
  );
}

const styles = StyleSheet.create({});
