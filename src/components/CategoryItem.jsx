import { View, Text, StyleSheet, Pressable } from 'react-native';
import Container from './Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GradientContainer from './GradientContainer';
import { COLORS } from '../constants/colors';

export default function CategoryItem({
  title = 'title',
  icon = 'local-fire-department',
  color = '#000',
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
    <Container style={style.mainContainer}>
      <MaterialIcon name={icon} size={32} color={color} />
      <View style={style.containerCenter}>
        <View style={style.containerText}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.subtitle}>Ready to focus</Text>
        </View>
        {/*  progress bar */}
        <View style={style.containerProgress}>
          <GradientContainer
            style={{
              ...style.progressBar,
              ...style.progressActive,
              width: '0%',
            }}
          ></GradientContainer>
          <View style={{ ...style.progressBar, ...style.progressLeft }}></View>
        </View>
      </View>
      <MaterialIcon name="chevron-right" size={24} color={COLORS.secondaryText} />
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
    color: COLORS.primaryText,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.secondaryText,
  },
  containerProgress: {
    flexDirection: 'row',
    gap: 6,
  },
  progressBar: {
    height: 4,
  },
  progressActive: {
    backgroundColor: COLORS.primaryText,
    borderRadius: 2,
  },
  progressLeft: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 2,
  },
});
