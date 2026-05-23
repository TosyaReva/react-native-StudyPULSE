import supabase, { isSupabaseReachable } from './client';
import { DEFAULT_CATEGORIES } from '../constants/defaultCategories';
import {
  createLocalCategory,
  createLocalSession,
  getLocalCategories,
  getLocalSessions,
  resetLocalData,
} from '../storage/localDatabase';

const requireUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user;
};

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
};

export const checkSupabaseConnection = isSupabaseReachable;

export const signUpUser = async ({ email, password, displayName }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!data.session) {
    const signInResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInResponse.error) {
      throw signInResponse.error;
    }
  }

  await bootstrapAuthenticatedUser(displayName);

  return getCurrentSession();
};

export const signInUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  await bootstrapAuthenticatedUser();

  return data.session;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const bootstrapAuthenticatedUser = async displayName => {
  const user = await requireUser();

  const { error: profileError } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      display_name:
        displayName ||
        user.user_metadata?.display_name ||
        user.email?.split('@')[0] ||
        'StudyPulse User',
    },
    { onConflict: 'id' },
  );

  if (profileError) {
    throw profileError;
  }

  const { count, error: countError } = await supabase
    .from('categories')
    .select('id', { count: 'exact', head: true });

  if (countError) {
    throw countError;
  }

  if (count === 0) {
    const { error } = await supabase.from('categories').insert(
      DEFAULT_CATEGORIES.map(category => ({
        ...category,
        user_id: user.id,
      })),
    );

    if (error) {
      throw error;
    }
  }
};

export const fetchCategories = async ({ mode } = {}) => {
  if (mode === 'guest') {
    return getLocalCategories();
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const createCategory = async ({ title, icon, color, mode }) => {
  if (mode === 'guest') {
    return createLocalCategory({ title, icon, color });
  }

  const user = await requireUser();
  const { data, error } = await supabase
    .from('categories')
    .insert({
      title,
      icon,
      color,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const fetchSessions = async ({ categoryId, mode } = {}) => {
  if (mode === 'guest') {
    return getLocalSessions({ categoryId });
  }

  let query = supabase
    .from('focus_sessions')
    .select('*, categories(title, color, icon)')
    .order('ended_at', { ascending: false });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};

export const createSession = async ({
  category_id,
  planned_duration_min,
  focused_seconds,
  status,
  started_at,
  ended_at,
  mode,
}) => {
  const payload = {
    category_id,
    planned_duration_min,
    focused_seconds,
    status,
    started_at,
    ended_at,
  };

  if (mode === 'guest') {
    return createLocalSession(payload);
  }

  const user = await requireUser();
  const { data, error } = await supabase
    .from('focus_sessions')
    .insert({
      ...payload,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const resetAllData = async ({ mode } = {}) => {
  if (mode === 'guest') {
    resetLocalData();
    return;
  }

  const user = await requireUser();

  const { error: sessionsError } = await supabase
    .from('focus_sessions')
    .delete()
    .eq('user_id', user.id);

  if (sessionsError) {
    throw sessionsError;
  }

  const { error: categoriesError } = await supabase
    .from('categories')
    .delete()
    .eq('user_id', user.id);

  if (categoriesError) {
    throw categoriesError;
  }

  await bootstrapAuthenticatedUser();
};
