import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export const useScaleAnimation = (pressedScale = 0.95) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(pressedScale);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return { animatedStyle, handlePressIn, handlePressOut };
};
