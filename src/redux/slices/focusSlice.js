import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
  plannedDurationMin: 25,
  remainingSeconds: 25 * 60,
  startedAt: null,
  isRunning: false,
};

const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    startFocus: (state, action) => {
      state.category = action.payload.category;
      state.plannedDurationMin = action.payload.plannedDurationMin;
      state.remainingSeconds = action.payload.plannedDurationMin * 60;
      state.startedAt = new Date().toISOString();
      state.isRunning = true;
    },
    pauseFocus: state => {
      state.isRunning = false;
    },
    resumeFocus: state => {
      if (state.category && state.remainingSeconds > 0) {
        state.isRunning = true;
      }
    },
    tickFocus: state => {
      if (state.isRunning && state.remainingSeconds > 0) {
        state.remainingSeconds -= 1;
      }
    },
    clearFocus: () => initialState,
  },
});

export const {
  clearFocus,
  pauseFocus,
  resumeFocus,
  startFocus,
  tickFocus,
} = focusSlice.actions;

export default focusSlice.reducer;

export const selectActiveFocus = state => state.focus;
export const selectHasActiveFocus = state => Boolean(state.focus.category);
