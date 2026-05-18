import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { fetchCategories, createCategory } from '../../api/api';

export const fetchCategoriesAsync = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  },
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const newCategory = await createCategory(categoryData);
      return newCategory;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add category');
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Get Categories
      .addCase(fetchCategoriesAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Category
      .addCase(addCategoryAsync.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.items.sort((a, b) => a.title.localeCompare(b.title));
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default categoriesSlice.reducer;

export const selectAllCategories = state => state.categories.items;
export const selectCategoriesLoading = state => state.categories.loading;
export const selectCategoriesError = state => state.categories.error;

export const selectCategoriesBySearch = createSelector(
  [selectAllCategories, (state, searchValue) => searchValue],
  (categories, searchValue) => {
    if (!searchValue) return categories;
    const lowerSearch = searchValue.toLowerCase();
    return categories.filter(({ title }) =>
      title.toLowerCase().includes(lowerSearch),
    );
  },
);
