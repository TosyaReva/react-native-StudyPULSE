import { View, Text, StyleSheet, Pressable } from 'react-native';
import Container from './Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GradientContainer from './GradientContainer';
import { COLORS } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

export default function CategoryItem({
  title = 'title',
  icon = 'local-fire-department',
  color = '#000',
  progress = 0,
  onPress,
}) {
  const { themeColors } = useTheme();

  return (
    <Pressable onPress={onPress}>
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
            style={{
              ...style.progressBar,
              ...style.progressActive,
              width: `${progress}%`,
            }}
          ></GradientContainer>
          <View style={{ ...style.progressBar, ...style.progressLeft, backgroundColor: themeColors.background }}></View>
        </View>
      </View>
      <MaterialIcon name="chevron-right" size={24} color={themeColors.secondaryText} />
    </Container>
    </Pressable>
  );
}

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
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
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
