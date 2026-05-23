import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  checkSupabaseConnection,
  getCurrentSession,
  signInUser,
  signOutUser,
  signUpUser,
} from '../../api/api';
import {
  getGuestMode,
  seedGuestData,
  setGuestMode,
} from '../../storage/localDatabase';

const normalizeSession = session => ({
  session,
  user: session?.user || null,
});

export const initializeAuthAsync = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      if (getGuestMode()) {
        seedGuestData();
        return {
          mode: 'guest',
          session: null,
          user: null,
          offlineFallback: false,
        };
      }

      const supabaseReachable = await checkSupabaseConnection();

      if (!supabaseReachable) {
        seedGuestData();
        return {
          mode: 'guest',
          session: null,
          user: null,
          offlineFallback: true,
        };
      }

      const session = await getCurrentSession();

      if (session) {
        return {
          mode: 'authenticated',
          ...normalizeSession(session),
          offlineFallback: false,
        };
      }

      return {
        mode: null,
        session: null,
        user: null,
        offlineFallback: false,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to initialize auth');
    }
  },
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      setGuestMode(false);
      const session = await signUpUser(credentials);

      return {
        mode: 'authenticated',
        ...normalizeSession(session),
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to register user');
    }
  },
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      setGuestMode(false);
      const session = await signInUser(credentials);

      return {
        mode: 'authenticated',
        ...normalizeSession(session),
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to sign in');
    }
  },
);

export const continueAsGuestAsync = createAsyncThunk('auth/guest', async () => {
  await signOutUser().catch(() => {});
  setGuestMode(true);
  seedGuestData();

  return {
    mode: 'guest',
    session: null,
    user: null,
  };
});

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
  await signOutUser().catch(() => {});
  setGuestMode(false);

  return {
    mode: null,
    session: null,
    user: null,
  };
});

const initialState = {
  mode: null,
  session: null,
  user: null,
  initializing: true,
  loading: false,
  error: null,
  offlineFallback: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initializeAuthAsync.pending, state => {
        state.initializing = true;
        state.error = null;
      })
      .addCase(initializeAuthAsync.fulfilled, (state, action) => {
        state.initializing = false;
        state.mode = action.payload.mode;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.offlineFallback = action.payload.offlineFallback;
      })
      .addCase(initializeAuthAsync.rejected, (state, action) => {
        state.initializing = false;
        state.error = action.payload;
      })
      .addCase(registerAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.mode = action.payload.mode;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.offlineFallback = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.mode = action.payload.mode;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.offlineFallback = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(continueAsGuestAsync.fulfilled, (state, action) => {
        state.mode = action.payload.mode;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.error = null;
        state.offlineFallback = false;
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.mode = action.payload.mode;
        state.session = action.payload.session;
        state.user = action.payload.user;
        state.error = null;
        state.offlineFallback = false;
      });
  },
});

export default authSlice.reducer;

export const selectAuthMode = state => state.auth.mode;
export const selectAuthLoading = state => state.auth.loading;
export const selectAuthInitializing = state => state.auth.initializing;
export const selectAuthError = state => state.auth.error;
export const selectOfflineFallback = state => state.auth.offlineFallback;
export const selectCurrentUser = state => state.auth.user;
