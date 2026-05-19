import { Pressable, StyleSheet } from 'react-native';
import Container from './Container';
import GradientBorder from './GradientBorder';
import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';

export default function RadioButton({
  title = 'value',
  isActive,
  onPress,
  children,
  style,
}) {
  const { animatedStyle, handlePressIn, handlePressOut } = useScaleAnimation(0.95);

  const Wrapper = ({ children }) =>
    isActive ? (
      <GradientBorder borderWidth={1.5} borderRadius={8}>
        {children}
      </GradientBorder>
    ) : (
      <>{children}</>
    );
  return (
    <Pressable 
      onPress={() => onPress(title)} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      <Animated.View style={animatedStyle}>
        <Wrapper>
          <Container style={isActive && styles.activeContainer}>
            {children}
          </Container>
        </Wrapper>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activeContainer: {
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 7,
  },
});
