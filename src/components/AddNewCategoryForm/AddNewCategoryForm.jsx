import { View, StyleSheet, Pressable, Text, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCategoryAsync } from '../../redux/slices/categoriesSlice';

import CustomText from '../CustomText.jsx';
import RadioButton from '../RadioButton.jsx';
import SearchInput from '../SearchInput.jsx';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants/colors';
import Button from '../Button.jsx';

const iconsToRender = [
  'code',
  'translate',
  'palette',
  'school',
  'fitness-center',
];

export default function AddNewCategoryForm() {
  const [name, setName] = useState('');
  const [value, setValue] = useState(iconsToRender[0]);
  const [iconColor, setIconColor] = useState(COLORS.iconColors[0]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Помилка', 'Введіть назву категорії');
      return;
    }
    
    dispatch(addCategoryAsync({ title: name, icon: value, color: iconColor }))
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Помилка', 'Не вдалося зберегти категорію');
        console.error(error);
      });
  };

  return (
    <View style={styles.form}>
      <SearchInput
        placeholder="Enter name..."
        showIcon={false}
        callback={setName}
      />
      <View style={styles.formItem}>
        <CustomText type="title">Choose Icon</CustomText>
        <ScrollView horizontal style={styles.listIcons}>
          {iconsToRender.map(icon => (
            <RadioButton
              title={icon}
              key={icon}
              onPress={setValue}
              isActive={icon === value}
              style={styles.listItem}
            >
              <MaterialIcon name={icon} size={32} color={iconColor} />
            </RadioButton>
          ))}
        </ScrollView>
      </View>
      <View style={[styles.formItem]}>
        <CustomText type="title">Choose Color</CustomText>
        <View style={styles.listColor}>
          {COLORS.iconColors.map(color => {
            return (
              <Pressable
                key={color}
                style={[
                  styles.colorItem,
                  {
                    borderColor:
                      color === iconColor ? iconColor : 'transparent',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setIconColor(color)}
              >
                <View
                  style={[
                    { backgroundColor: color, flex: 1, borderRadius: 90 },
                  ]}
                ></View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <Button title="Save Category" primary onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 40,
  },
  listItem: {
    marginHorizontal: 8,
  },
  listColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorItem: {
    // flex: 1,
    width: 64,
    height: 64,
    padding: 4,
  },
  formItem: {
    gap: 8,
  },
});
