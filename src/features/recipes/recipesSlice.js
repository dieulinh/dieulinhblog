import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

// Define the initial state
const initialState = {
  recipes: [],
  status: 'idle',
  error: null,
};

// Define the async thunk for fetching all recipes
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  try {
    const response = await axios.get('/api/recipes'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch recipes');
  }
});
export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      // Make the POST request to submit the form data
      const response = await axios.post('/api/recipes', recipeData);
      return response.data;
    } catch (error) {
      // Handle any errors and return the error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the recipes slice
const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload.recipes;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.recipes.push({ ...action.payload});
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export the async thunk and the recipes reducer
export const selectRecipes = (state) => state.recipes.recipes;
export const isRecipesLoading = (state) => state.recipes.status === 'loading';
export default recipesSlice.reducer;