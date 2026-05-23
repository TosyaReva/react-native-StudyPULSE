import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import shadowStyle from '../../constants/shadowStyle';
import { COLORS } from '../../constants/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../CustomText';

const ButtonWrapper = ({ icon, title, rightElement, onPress, disabled = false }) => {
  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        disabled && styles.containerDisabled,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <MaterialIcon
            name={icon}
            size={24}
            color={COLORS.primaryText}
            style={styles.icon}
          />
        )}
        {title && <CustomText style={styles.titleText}>{title}</CustomText>}
      </View>
      {rightElement}
    </Pressable>
  );
};

export default ButtonWrapper;

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    padding: 12,
    borderRadius: 90,
    backgroundColor: COLORS.white2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  containerPressed: {
    opacity: 0.75,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  titleText: { color: COLORS.primaryText },
});
