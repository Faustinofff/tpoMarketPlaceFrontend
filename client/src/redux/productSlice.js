import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = "http://localhost:4002/api/v1/products";

// Thunks
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const { data } = await axios.get(URL_API);
    return data;
});

export const createProduct = createAsyncThunk("products/createProduct", async (productData) => {
    const { data } = await axios.post(URL_API, productData);
    return data;
});

// Slice
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export default productSlice.reducer;
