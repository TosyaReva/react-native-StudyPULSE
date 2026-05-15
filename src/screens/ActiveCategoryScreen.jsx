import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import DonutBar from '../components/DonutBar.jsx';
import ScreenComponent from './ScreenComponent.jsx';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

export default function ActiveCategoryScreen({ navigation, route }) {
  const task = route.params || {};
  return (
    <ScreenComponent style={{ marginTop: 40 }}>


      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Back button */}
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcon name="close" size={24} color={COLORS.primaryText} />
          </Pressable>
          <CustomText type="title">Deep Work</CustomText>
          <Pressable style={styles.backButton}>
            <MaterialIcon name="more-horiz" size={24} color={COLORS.primaryText} />
          </Pressable>
        </View>

        <CustomText type="subtitle" style={styles.headerSubtitle}>Stay focused.</CustomText>
      </View>

      {/* Donut Bar */}
      <DonutBar progress={45} style={styles.donutBar} title={task.title} />
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
    marginBottom: 38,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {

    textAlign: 'center',
  }
});
