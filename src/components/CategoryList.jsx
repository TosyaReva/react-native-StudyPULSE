import React, { useCallback, useMemo } from 'react';
import CategoryItem from './CategoryItem';
import {
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import SCREENS from '../constants/screens.js';

export default function CategoryList({ data, navigation }) {
  const handleOnPress = useCallback((item) => {
    navigation.navigate(SCREENS.ACTIVE_CATEGORY, item);
  }, [navigation]);

  const contentContainerStyle = useMemo(() => ({ gap: 16 }), []);

  const renderItem = useCallback(({ item }) => (
    <CategoryItem
      item={item}
      title={item.title}
      icon={item.icon}
      color={item.color}
      progress={item.progress}
      onPress={handleOnPress}
    />
  ), [handleOnPress]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({});
