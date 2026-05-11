import { Pressable, StyleSheet, Text, View } from 'react-native';
import GradientContainer from './GradientContainer';
import { COLORS } from '../constants/colors';

export default function Button({ title = 'Button', onPress, primary = false }) {
  const Gradient = primary
    ? () => (
        <GradientContainer style={styles.wrapper}>
          <Text style={styles.text}>{title}</Text>
        </GradientContainer>
      )
    : () => (
        <View style={{ ...styles.wrapper, ...styles.secondaryButton }}>
          <Text style={{ ...styles.text, ...styles.secondaryText }}>
            {title}
          </Text>
        </View>
      );
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Gradient>
        <Text style={styles.text}>{title}</Text>
      </Gradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  wrapper: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
  },
  text: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '150%',
    letterSpacing: 1,
    color: COLORS.white,
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
