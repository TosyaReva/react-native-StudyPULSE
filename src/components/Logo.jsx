import { StyleSheet, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';


export default function Logo() {

  const { width } = useWindowDimensions();
  return (
    <Image
      style={[styles.logo, { width: width * 0.7 }]}
      source={require('../assets/Logo.png')}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 280,
    minWidth: 256,
    height: 244,
  },
});
