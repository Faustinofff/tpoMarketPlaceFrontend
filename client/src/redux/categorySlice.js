// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para obtener todas las categorías
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const URL_CATEGORIAS = "http://localhost:4002/api/v1/categories";
      const { data } = await axios.get(URL_CATEGORIAS);
      // Asume que las categorías pueden estar en data o data.content
      return data.content || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error de red al obtener categorías");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al obtener categorías";
      });
  },
});

export default categorySlice.reducer;