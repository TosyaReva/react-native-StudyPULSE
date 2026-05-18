/**
 *
 *   GET /categories → list all categories
 *   GET /categories?id=eq.<id>  → single category
 *   GET /focus_sessions → list sessions (with ordering)
 *   POST /focus_sessions → create a new session
 */

import client from './client';

/**
 * Fetch all categories ordered alphabetically.
 * @returns {Promise<Array>} list of category objects
 */
export const fetchCategories = async () => {
  // order=title.asc tells PostgREST to sort by the title column
  const response = await client.get('/categories', {
    params: { order: 'title.asc' },
  });
  return response.data; // axios puts the parsed body in .data
};

/**
 * Create a new category.
 * @param {Object} category
 * @param {string} category.title
 * @param {string} category.icon
 * @param {string} category.color
 * @returns {Promise<Object>} the created category object
 */
export const createCategory = async ({ title, icon, color }) => {
  const response = await client.post('/categories', {
    title,
    icon,
    color,
  });
  return Array.isArray(response.data) ? response.data[0] : response.data;
};

/**
 * Fetch a single category by its UUID.
 * @param {string} id — category UUID
 * @returns {Promise<Object>} category object
 */
export const fetchCategoryById = async (id) => {
  // PostgREST horizontal filtering: ?id=eq.<value>
  const response = await client.get('/categories', {
    params: { id: `eq.${id}` },
    headers: {
      // Ask PostgREST for a single object instead of an array
      Accept: 'application/vnd.pgrst.object+json',
    },
  });
  return response.data;
};

/**
 * Fetch all focus sessions, newest first.
 * Optionally filter by category.
 *
 * @param {Object} options
 * @param {string} [options.categoryId] — filter by category UUID
 * @returns {Promise<Array>} list of session objects
 */
export const fetchSessions = async ({ categoryId } = {}) => {
  const params = { order: 'completed_at.desc' };

  if (categoryId) {
    params.category_id = `eq.${categoryId}`;
  }

  const response = await client.get('/focus_sessions', { params });
  return response.data;
};

/**
 * Save a newly completed focus session.
 *
 * @param {Object} session
 * @param {string} session.category_id  — UUID of the chosen category
 * @param {number} session.duration_min — duration in minutes (integer)
 * @returns {Promise<Object>} the created session object
 */
export const createSession = async ({ category_id, duration_min }) => {
  const response = await client.post('/focus_sessions', {
    category_id,
    duration_min,
  });
  return Array.isArray(response.data) ? response.data[0] : response.data;
};
