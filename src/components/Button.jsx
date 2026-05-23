import { Pressable, StyleSheet, Text, View } from 'react-native';
import GradientContainer from './GradientContainer';
import { COLORS } from '../constants/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

export default function Button({
  title = 'Button',
  onPress,
  primary = false,
  style,
  icon,
}) {
  const { themeColors } = useTheme();
  const iconColor = !primary ? COLORS.brand : COLORS.white;

  const { animatedStyle, handlePressIn, handlePressOut } = useScaleAnimation(0.95);
  const iconElement = icon ? (
    <MaterialIcon name={icon} size={20} color={iconColor} />
  ) : null;
  const content = (
    <>
      {iconElement}
      <Text style={primary ? styles.text : [styles.text, styles.secondaryText]}>
        {title}
      </Text>
    </>
  );

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, style]}
    >
      <Animated.View style={animatedStyle}>
        {primary ? (
          <GradientContainer
            style={styles.gradientWrapper}
            innerStyle={styles.inner}
          >
            {content}
          </GradientContainer>
        ) : (
          <View
            style={[
              styles.inner,
              styles.secondaryButton,
              { backgroundColor: themeColors.surface },
            ]}
          >
            {content}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  gradientWrapper: {
    borderRadius: 20,
  },
  inner: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  text: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    color: COLORS.white,
    textAlign: 'center',
  },
  secondaryText: {
    color: COLORS.brand,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
