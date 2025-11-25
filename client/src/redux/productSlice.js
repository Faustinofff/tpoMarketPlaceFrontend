
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const URL_API = "http://localhost:4002/api/v1/products";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const { data } = await axios.get(URL_API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);


export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const { data } = await axios.post(URL_API, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);


export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const { id, ...rest } = updatedProduct; 
    const { data } = await axios.put(`${URL_API}/${id}`, rest, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);


export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const { data } = await axios.delete(`${URL_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { id }; 
  }
);


const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      });
  },
});

export default productSlice.reducer;
