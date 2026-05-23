import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategoriesAsync,
  selectCategoriesBySearch,
  selectCategoriesLoading,
  selectCategoriesError,
} from '../redux/slices/categoriesSlice';

import ButtonPlusCircle from '../components/ButtonPlusCircle.jsx';
import CategoryList from '../components/CategoryList.jsx';
import CustomText from '../components/CustomText';
import SearchInput from '../components/SearchInput.jsx';
import ScreenComponent from './ScreenComponent.jsx';

import { COLORS } from '../constants/colors';
import SCREENS from '../constants/screens.js';

const CategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const filteredCategories = useSelector(state =>
    selectCategoriesBySearch(state, searchValue),
  );

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <ScreenComponent style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title">Focus Categories</CustomText>
        <ButtonPlusCircle
          onPress={() => navigation.navigate(SCREENS.ADD_NEW_CATEGORY)}
        />
      </View>

      <SearchInput
        callback={setSearchValue}
        placeholder="Search categories..."
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.brand}
          style={styles.centered}
        />
      )}

      {!loading && error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && (
        <CategoryList data={filteredCategories} navigation={navigation} />
      )}
    </ScreenComponent>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centered: {
    marginTop: 40,
  },
  errorText: {
    color: '#FF6584',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
});
