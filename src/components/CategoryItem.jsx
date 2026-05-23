import { View, Text, StyleSheet, Pressable } from 'react-native';
import Container from './Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GradientContainer from './GradientContainer';
import { useTheme } from '../context/ThemeContext';
import Animated from 'react-native-reanimated';
import { useScaleAnimation } from '../hooks/useScaleAnimation';
import React from 'react';

const CategoryItem = React.memo(({
  title = 'title',
  icon = 'local-fire-department',
  color = '#000',
  progress = 0,
  item,
  onPress,
}) => {
  const { themeColors } = useTheme();

  const { animatedStyle, handlePressIn, handlePressOut } = useScaleAnimation(0.95);

  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={animatedStyle}>
        <Container style={style.mainContainer}>
          <MaterialIcon name={icon} size={32} color={color} />
          <View style={style.containerCenter}>
            <View style={style.containerText}>
              <Text style={[style.title, { color: themeColors.primaryText }]}>{title}</Text>
              <Text style={[style.subtitle, { color: themeColors.secondaryText }]}>Ready to focus</Text>
            </View>
            {/*  progress bar */}
            <View style={style.containerProgress}>
              <GradientContainer
                style={[
                  style.progressBar,
                  style.progressActive,
                  { width: `${progress}%` },
                ]}
              />
              <View
                style={[
                  style.progressBar,
                  style.progressLeft,
                  { backgroundColor: themeColors.background },
                ]}
              />
            </View>
          </View>
          <MaterialIcon name="chevron-right" size={24} color={themeColors.secondaryText} />
        </Container>
      </Animated.View>
    </Pressable>
  );
});

export default CategoryItem;

const style = StyleSheet.create({
  mainContainer: {
    gap: 14,
  },
  containerCenter: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  containerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  containerProgress: {
    flexDirection: 'row',
    gap: 6,
  },
  progressBar: {
    height: 4,
  },
  progressActive: {
    borderRadius: 2,
  },
  progressLeft: {
    flex: 1,
    borderRadius: 2,
  },
});
