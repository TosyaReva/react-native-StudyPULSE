import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ButtonPlusCircle from '../components/ButtonPlusCircle.jsx';
import CategoryList from '../components/CategoryList.jsx';
import CustomText from '../components/CustomText';
import SearchInput from '../components/SearchInput.jsx';
import ScreenComponent from './ScreenComponent.jsx';

import { fetchCategories } from '../api/api';
import { COLORS } from '../constants/colors';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);  // raw data from API
  const [loading, setLoading] = useState(true); // show spinner while fetching
  const [error, setError] = useState(null); // hold error message if any
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
      .catch(err => {
        console.error('Failed to load categories:', err);
        setError('Could not load categories. Check your connection and try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchValue) return categories;
    return categories.filter(({ title }) =>
      title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
    );
  }, [searchValue, categories]);

  return (
    <ScreenComponent style={styles.container}>
      {/* Header row */}
      <View style={styles.header}>
        <CustomText type="title">Focus Categories</CustomText>
        <ButtonPlusCircle />
      </View>

      {/* Search bar */}
      <SearchInput callback={setSearchValue} placeholder="Search categories..." />

      {/* Loading spinner */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.brand}
          style={styles.centered}
        />
      )}

      {/* Error message */}
      {!loading && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Category list */}
      {!loading && !error && (
        <CategoryList
          data={filteredCategories}
          navigation={navigation}
        />
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
