import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSession, fetchSessions } from '../../api/api';

export const fetchSessionsAsync = createAsyncThunk(
  'sessions/fetchSessions',
  async (options = {}, { getState, rejectWithValue }) => {
    try {
      const { mode } = getState().auth;
      return await fetchSessions({ ...options, mode });
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch sessions');
    }
  },
);

export const addSessionAsync = createAsyncThunk(
  'sessions/addSession',
  async (sessionData, { getState, rejectWithValue }) => {
    try {
      const { mode } = getState().auth;
      return await createSession({ ...sessionData, mode });
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to save session');
    }
  },
);

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSessionsAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSessionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSessionAsync.pending, state => {
        state.error = null;
      })
      .addCase(addSessionAsync.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addSessionAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default sessionsSlice.reducer;

export const selectAllSessions = state => state.sessions.items;
export const selectSessionsLoading = state => state.sessions.loading;
export const selectSessionsError = state => state.sessions.error;
