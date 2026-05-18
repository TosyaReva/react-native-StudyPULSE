import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

export default function SearchInput({
  callback,
  placeholder = 'Search...',
  showIcon = true,
}) {
  const [text, setText] = useState('');
  const { themeColors } = useTheme();

  const handleChange = value => {
    setText(value);
    if (callback) {
      callback(value);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <TextInput
        style={[styles.input, { color: themeColors.primaryText }]}
        value={text}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={themeColors.secondaryText}
      />
      {showIcon && (
        <MaterialIcon
          name="search"
          size={24}
          color={themeColors.secondaryText}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  icon: {
    padding: 12,
  },
});
