import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

const ButtonPlusCircle = ({ style, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialIcon
        name={'add-circle-outline'}
        size={32}
        color={COLORS.brand}
        style={style}
      />
    </Pressable>
  );
};

export default ButtonPlusCircle;

const styles = StyleSheet.create({});
