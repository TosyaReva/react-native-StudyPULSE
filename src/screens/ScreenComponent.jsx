import { ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScreenComponent({ children, style }) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

