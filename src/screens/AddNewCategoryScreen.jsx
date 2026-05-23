import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import { AddNewCategoryForm } from '../components/AddNewCategoryForm';
import ScreenComponent from './ScreenComponent.jsx';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

export default function AddNewCategoryScreen({ navigation, route }) {
  const { animatedStyle: animatedClose, handlePressIn, handlePressOut } = useScaleAnimation(0.85);

  return (
    <ScreenComponent style={styles.screen}>
      {/* Header */}
      <View>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <CustomText type="title" style={styles.title}>
              New Category
            </CustomText>
            {/* Exit button */}
            <Pressable
              onPress={() => navigation.goBack()}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View style={[styles.backButton, animatedClose]}>
                <MaterialIcon name="close" size={24} color={COLORS.primaryText} />
              </Animated.View>
            </Pressable>
          </View>

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
  screen: {
    marginTop: 40,
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
