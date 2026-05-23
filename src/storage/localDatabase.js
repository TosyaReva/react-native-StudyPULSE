import { createMMKV } from 'react-native-mmkv';
import { DEFAULT_CATEGORIES } from '../constants/defaultCategories';

export const storage = createMMKV({
  id: 'studypulse-storage',
});

const GUEST_MODE_KEY = 'auth.guestMode';
const GUEST_CATEGORIES_KEY = 'guest.categories';
const GUEST_SESSIONS_KEY = 'guest.focusSessions';

const createLocalId = prefix =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const readJson = (key, fallback) => {
  const rawValue = storage.getString(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return fallback;
  }
};

const writeJson = (key, value) => {
  storage.set(key, JSON.stringify(value));
};

export const authStorage = {
  getItem: key => storage.getString(key) || null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: key => storage.remove(key),
};

export const getGuestMode = () => storage.getBoolean(GUEST_MODE_KEY) || false;

export const setGuestMode = value => {
  storage.set(GUEST_MODE_KEY, value);
};

export const seedGuestData = () => {
  const existingCategories = readJson(GUEST_CATEGORIES_KEY, []);

  if (existingCategories.length > 0) {
    return;
  }

  const now = new Date().toISOString();
  const categories = DEFAULT_CATEGORIES.map(category => ({
    id: createLocalId('category'),
    ...category,
    progress: 0,
    created_at: now,
    updated_at: now,
  }));

  writeJson(GUEST_CATEGORIES_KEY, categories);
  writeJson(GUEST_SESSIONS_KEY, []);
};

export const getLocalCategories = () => {
  seedGuestData();
  return readJson(GUEST_CATEGORIES_KEY, []).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
};

export const createLocalCategory = ({ title, icon, color }) => {
  const now = new Date().toISOString();
  const categories = getLocalCategories();
  const category = {
    id: createLocalId('category'),
    title,
    icon,
    color,
    progress: 0,
    created_at: now,
    updated_at: now,
  };

  writeJson(
    GUEST_CATEGORIES_KEY,
    [...categories, category].sort((a, b) => a.title.localeCompare(b.title)),
  );

  return category;
};

export const getLocalSessions = ({ categoryId } = {}) => {
  const sessions = readJson(GUEST_SESSIONS_KEY, []);

  return sessions
    .filter(session => !categoryId || session.category_id === categoryId)
    .sort((a, b) => new Date(b.ended_at) - new Date(a.ended_at));
};

export const createLocalSession = session => {
  const now = new Date().toISOString();
  const sessions = readJson(GUEST_SESSIONS_KEY, []);
  const newSession = {
    id: createLocalId('session'),
    ...session,
    created_at: now,
  };

  writeJson(GUEST_SESSIONS_KEY, [newSession, ...sessions]);

  return newSession;
};

export const resetLocalData = () => {
  storage.remove(GUEST_CATEGORIES_KEY);
  storage.remove(GUEST_SESSIONS_KEY);
  seedGuestData();
};
