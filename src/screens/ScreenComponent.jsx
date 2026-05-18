import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function ScreenComponent({ children, style }) {
  const insets = useSafeAreaInsets();
  const { themeColors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={[
          styles.container,
          {
            // paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          style,
        ]}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

