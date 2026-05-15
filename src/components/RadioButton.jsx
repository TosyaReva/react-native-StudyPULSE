import { Pressable, StyleSheet, Text } from 'react-native';
import Container from './Container';
import GradientBorder from './GradientBorder';

export default function RadioButton({ title = 'value', isActive, onPress }) {
  const Wrapper = ({ children }) =>
    isActive ? (
      <GradientBorder borderWidth={1.5} borderRadius={8}>
        {children}
      </GradientBorder>
    ) : (
      <>{children}</>
    );
  return (
    <Pressable onPress={() => onPress(title)}>
      <Wrapper>
        <Container style={isActive && styles.activeContainer}>
          <Text>{title}</Text>
        </Container>
      </Wrapper>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Прибираємо border і тінь коли активний — залишаємо місце градієнтному бордеру
  activeContainer: {
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    // borderRadius трохи менший ніж у GradientBorder щоб виглядало акуратно
    borderRadius: 7,
  },
});
