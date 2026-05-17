import { Pressable, StyleSheet } from 'react-native';
import Container from './Container';
import GradientBorder from './GradientBorder';

export default function RadioButton({
  title = 'value',
  isActive,
  onPress,
  children,
  style,
}) {
  const Wrapper = ({ children }) =>
    isActive ? (
      <GradientBorder borderWidth={1.5} borderRadius={8}>
        {children}
      </GradientBorder>
    ) : (
      <>{children}</>
    );
  return (
    <Pressable onPress={() => onPress(title)} style={style}>
      <Wrapper>
        <Container style={isActive && styles.activeContainer}>
          {children}
        </Container>
      </Wrapper>
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
