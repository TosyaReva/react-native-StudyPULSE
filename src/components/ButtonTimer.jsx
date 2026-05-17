import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import Container from './Container';
import { COLORS } from '../constants/colors';

export default function ButtonTimer({
  icon = 'pause',
  title = 'pause',
  onPress,
  isActive = false,
}) {
  const color = isActive ? COLORS.brand : COLORS.secondaryText;
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <Container style={styles.container}>
        <MaterialIcon name={icon} size={32} color={color} />
        <Text style={isActive ? styles.titleActive : styles.title}>
          {title}
        </Text>
      </Container>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    justifyContent: 'flex-start',
  },
  titleActive: {
    color: COLORS.brand,
  },
  title: {
    color: COLORS.secondaryText,
  },
});
