import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { authStorage } from '../storage/localDatabase';

const SUPABASE_URL = 'https://dptawlxaoydtvmfgzrpz.supabase.co';
const SUPABASE_ANON_KEY =
  'sb_publishable_r3XQPHoqnIwuLw4xgcMUbA_zqTzrBYn';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: authStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const isSupabaseReachable = async () => {
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/health`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export default supabase;
