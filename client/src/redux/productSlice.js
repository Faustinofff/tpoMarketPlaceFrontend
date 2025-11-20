import  { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = "http://localhost:4002/api/v1/products";
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
const { data } = await axios.get(URL_API)
return data;
});

export const createProduct = createAsyncThunk("products/createProduct", async (productData) => {
    const { data } = await axios.post(URL_API, productData);
    return data;
});

const postSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [...state.items, action.payload]; 
            });
    },
});

export default postSlice.reducer;