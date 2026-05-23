import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';
import focusReducer from './slices/focusSlice';
import sessionsReducer from './slices/sessionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    focus: focusReducer,
    sessions: sessionsReducer,
  },
});
