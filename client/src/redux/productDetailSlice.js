// src/redux/productDetailSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para obtener un producto por ID
export const fetchProductById = createAsyncThunk(
  "productDetail/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const URL = `http://localhost:4002/api/v1/products/${id}`;
      // Usamos axios para consistencia con tu productSlice
      const { data } = await axios.get(URL); 
      return data;
    } catch (error) {
      // Retorna el error de la respuesta o un mensaje genérico
      return thunkAPI.rejectWithValue(error.response?.data || "Error de red al obtener el detalle");
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.product = null;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al obtener el producto";
        state.product = null;
      });
  },
});

export default productDetailSlice.reducer;