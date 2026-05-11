import { View, Text, StyleSheet } from 'react-native';
import Container from './Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import GradientContainer from './GradientContainer';
import { COLORS } from '../constants/colors';

export default function CategoryItem({
  progress = 0.5,
  title = 'title',
  subtitle = 'subtitle',
}) {
  return (
    <Container style={style.mainContainer}>
      <MaterialIcon name={'local-fire-department'} size={32} color="#000" />
      <View style={style.containerCenter}>
        <View style={style.containerText}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.subtitle}>{subtitle}</Text>
        </View>
        {/*  progress bar */}
        <View style={style.containerProgress}>
          <GradientContainer
            style={{
              ...style.progressBar,
              ...style.progressActive,
              width: `${progress * 100}%`,
            }}
          ></GradientContainer>
          <View style={{ ...style.progressBar, ...style.progressLeft }}></View>
        </View>
      </View>
      <MaterialIcon name={'local-fire-department'} size={20} color={COLORS.secondaryText} />
    </Container>
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
