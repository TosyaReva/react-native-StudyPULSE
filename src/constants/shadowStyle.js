import { Platform } from 'react-native';

const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
  },
  android: {
    elevation: 2, // Тінь для Android
  },
});

export default shadowStyle;
