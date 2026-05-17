import axios from 'axios';

const SUPABASE_URL = 'https://dptawlxaoydtvmfgzrpz.supabase.co';
const SUPABASE_ANON_KEY =
  'sb_publishable_r3XQPHoqnIwuLw4xgcMUbA_zqTzrBYn'; // It is a Public Key

// Base URL for the PostgREST auto-generated REST API
const API_BASE_URL = `${SUPABASE_URL}/rest/v1`;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});

export default client;
