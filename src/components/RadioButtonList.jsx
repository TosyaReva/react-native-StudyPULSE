import { View, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import RadioButton from './RadioButton';

export default function RadioButtonList({ data, defautlValue, onChange }) {
  const [value, setValue] = useState(defautlValue || data[0]);
  return (
    <View style={styles.list}>
      {data.map(title => (
        <RadioButton
          key={title}
          onPress={setValue}
          title={title}
          isActive={value === title}
        >
          <Text>{title}</Text>
        </RadioButton>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
