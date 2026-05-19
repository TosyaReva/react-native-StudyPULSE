import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

const ButtonPlusCircle = ({ style, onPress }) => {
  const { animatedStyle, handlePressIn, handlePressOut } = useScaleAnimation(0.9);

  return (
    <Pressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={animatedStyle}>
        <MaterialIcon
          name={'add-circle-outline'}
          size={32}
          color={COLORS.brand}
          style={style}
        />
      </Animated.View>
    </Pressable>
  );
};

export default ButtonPlusCircle;
const styles = StyleSheet.create({});
