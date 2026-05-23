import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import CustomText from './CustomText';
import {
  loginAsync,
  registerAsync,
  selectAuthError,
  selectAuthLoading,
} from '../redux/slices/authSlice';
import { COLORS } from '../constants/colors';
import { useTheme } from '../context/ThemeContext';

const RegistrationForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const { themeColors } = useTheme();

  const [isLogin, setIsLogin] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('test@studypulse.local');
  const [password, setPassword] = useState('Password123!');

  const handleSubmit = () => {
    const action = isLogin
      ? loginAsync({ email: email.trim(), password })
      : registerAsync({
          displayName: displayName.trim() || email.trim().split('@')[0],
          email: email.trim(),
          password,
        });

    dispatch(action)
      .unwrap()
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      <CustomText type="title" style={styles.title}>
        {isLogin ? 'Welcome back' : 'Create account'}
      </CustomText>
      {!isLogin && (
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Name"
          placeholderTextColor={themeColors.secondaryText}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.surface,
              color: themeColors.primaryText,
              borderColor: themeColors.border,
            },
          ]}
        />
      )}
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor={themeColors.secondaryText}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.surface,
            color: themeColors.primaryText,
            borderColor: themeColors.border,
          },
        ]}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={themeColors.secondaryText}
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor: themeColors.surface,
            color: themeColors.primaryText,
            borderColor: themeColors.border,
          },
        ]}
      />
      {error && (
        <CustomText type="subtitle" style={styles.errorText}>
          {error}
        </CustomText>
      )}
      {loading ? (
        <ActivityIndicator color={COLORS.brand} />
      ) : (
        <Button
          title={isLogin ? 'Sign In' : 'Register'}
          primary
          onPress={handleSubmit}
        />
      )}
      <Pressable onPress={() => setIsLogin(value => !value)}>
        <CustomText type="subtitle" style={styles.switchText}>
          {isLogin ? 'Need an account? Register' : 'Already registered? Sign in'}
        </CustomText>
      </Pressable>
    </View>
  );
};

export default RegistrationForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FF6584',
    textAlign: 'center',
    fontSize: 14,
  },
  switchText: {
    textAlign: 'center',
    color: COLORS.brand,
  },
});
