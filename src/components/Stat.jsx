import { View, Text, StyleSheet } from 'react-native';
import Container from './Container';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

export default function Stat({
  icon = 'access-time',
  iconActive = false,
  title = 'title',
  subtitle = 'subtitle',
  style,
}) {
  const { themeColors } = useTheme();
  const iconColor = iconActive ? COLORS.brand : themeColors.primaryText;
  
  return (
    <Container style={style}>
      <MaterialIcon
        name={icon}
        size={32}
        color={iconColor}
        style={styles.icon}
      />
      <View style={styles.containerText}>
        <Text style={[styles.title, { color: themeColors.primaryText }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: themeColors.secondaryText }]}>{subtitle}</Text>
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
  },
  subtitle: {
    fontSize: 12,
  },
});
