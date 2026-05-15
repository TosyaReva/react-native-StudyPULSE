import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useMemo, useState } from 'react';
import CustomText from '../components/CustomText';
import ButtonPlusCircle from '../components/ButtonPlusCircle.jsx';
import SearchInput from '../components/SearchInput.jsx';
import ScreenComponent from './ScreenComponent.jsx';
import CategoryList from '../components/CategoryList.jsx';

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

const CategoriesScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');

  const categories = useMemo(
    () =>
      !searchValue
        ? DATA
        : DATA.filter(({ title }) =>
          title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        ),
    [searchValue],
  );

  return (
    <ScreenComponent style={styles.container}>
      <View style={styles.header}>
        <CustomText type="title">Focus Categories</CustomText>
        <ButtonPlusCircle />
      </View>

      <SearchInput
        callback={setSearchValue}
        placeholder="Search categories..."
      />
      <CategoryList data={categories} navigation={navigation} />
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
});
