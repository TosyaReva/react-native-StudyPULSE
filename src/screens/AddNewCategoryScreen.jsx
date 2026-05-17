import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import { AddNewCategoryForm } from '../components/AddNewCategoryForm';
import ScreenComponent from './ScreenComponent.jsx';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

export default function AddNewCategoryScreen({ navigation, route }) {
  const task = route.params || {};
  return (
    <ScreenComponent style={{ marginTop: 40 }}>
      {/* Header */}
      <View>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <CustomText type="title" style={styles.title}>
              New Category
            </CustomText>
          </View>
          {/* Exit button */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcon name="close" size={24} color={COLORS.primaryText} />
          </Pressable>
          <CustomText type="subtitle">Create a new focus category</CustomText>
        </View>
      </View>

      {/* Form */}
      <AddNewCategoryForm />
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 4,
  },
  header: {
    marginBottom: 40,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 400,
  },
  form: {
    gap: 40,
  },
});
