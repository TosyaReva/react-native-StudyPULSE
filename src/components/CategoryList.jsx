import React, { useCallback, useMemo } from 'react';
import { Alert, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import CategoryItem from './CategoryItem';
import SCREENS from '../constants/screens.js';
import { selectActiveFocus } from '../redux/slices/focusSlice.js';

export default function CategoryList({ data, navigation }) {
  const activeFocus = useSelector(selectActiveFocus);

  const handleOnPress = useCallback((item) => {
    if (activeFocus.category && activeFocus.category.id !== item.id) {
      Alert.alert(
        'Focus already active',
        'Only one focus can run at a time. Opening the active focus now.',
      );
      navigation.navigate(SCREENS.ACTIVE_CATEGORY, activeFocus.category);
      return;
    }

    navigation.navigate(SCREENS.ACTIVE_CATEGORY, item);
  }, [activeFocus.category, navigation]);

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
