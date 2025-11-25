
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const URL_CATEGORIAS = "http://localhost:4002/api/v1/categories";
      const { data } = await axios.get(URL_CATEGORIAS);
      
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
    status: "idle", 
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