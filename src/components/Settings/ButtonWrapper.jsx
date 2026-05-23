import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import shadowStyle from '../../constants/shadowStyle';
import { COLORS } from '../../constants/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../CustomText';
import { useTheme } from '../../context/ThemeContext';

const ButtonWrapper = ({
  icon,
  title,
  rightElement,
  onPress,
  disabled = false,
}) => {
  const { theme, themeColors } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
        isDarkMode && styles.darkContainer,
        pressed && styles.containerPressed,
        disabled && styles.containerDisabled,
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <MaterialIcon
            name={icon}
            size={24}
            color={themeColors.primaryText}
            style={styles.icon}
          />
        )}
        {title && (
          <CustomText style={[styles.titleText, { color: themeColors.primaryText }]}>
            {title}
          </CustomText>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    borderWidth: 1,
  },
  darkContainer: {
    shadowOpacity: 0,
    elevation: 0,
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
