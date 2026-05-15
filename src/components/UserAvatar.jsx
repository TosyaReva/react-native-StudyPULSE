import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function UserAvatar({ image }) {
  return <Image style={styles.image} source={image} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 90,
  },
});
