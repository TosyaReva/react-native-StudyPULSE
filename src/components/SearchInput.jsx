import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/colors';

export default function SearchInput({
  callback,
  placeholder = 'Search...',
  showIcon = true,
}) {
  const [text, setText] = useState('');

  const handleChange = value => {
    setText(value);
    if (callback) {
      callback(value);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.secondaryText}
      />
      {showIcon && (
        <MaterialIcon
          name="search"
          size={24}
          color={COLORS.secondaryText}
          style={styles.icon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: COLORS.primaryText,
  },
  icon: {
    padding: 12,
  },
});
