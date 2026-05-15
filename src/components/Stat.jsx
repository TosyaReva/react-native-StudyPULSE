import { View, Text, StyleSheet } from 'react-native';
import Container from './Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';

export default function Stat({
  icon = 'access-time',
  iconActive = false,
  title = 'title',
  subtitle = 'subtitle',
  style,
}) {
  const iconColor = iconActive ? COLORS.brand : COLORS.primaryText;
  return (
    <Container style={style}>
      <MaterialIcon
        name={icon}
        size={32}
        color={iconColor}
        style={styles.icon}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  containerText: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: COLORS.primaryText,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
});
