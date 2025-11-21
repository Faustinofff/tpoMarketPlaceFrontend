import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Definimos la URL de la API
const URL_API = "http://localhost:4002/api/v1/products";

// Obtener el token del localStorage
const getToken = () => localStorage.getItem("token");

// ** Thunks para interactuar con la API **
// Recupera los productos
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const token = getToken(); // Recuperamos el token
    const { data } = await axios.get(URL_API, {
        headers: { Authorization: `Bearer ${token}` }, // Incluir token
    });
    return data;
});

// Crear un producto
export const createProduct = createAsyncThunk("products/createProduct", async (productData) => {
    const token = getToken(); // Recuperamos el token
    const { data } = await axios.post(URL_API, productData, {
        headers: { Authorization: `Bearer ${token}` }, // Incluir token
    });
    return data;
});

// Actualizar un producto
export const updateProduct = createAsyncThunk("products/updateProduct", async (updatedProduct) => {
    const token = getToken(); // Recuperamos el token
    const { id, name, price, stock, categoryId, imageUrl } = updatedProduct;
    const { data } = await axios.put(`${URL_API}/${id}`, { name, price, stock, categoryId, imageUrl }, {
        headers: { Authorization: `Bearer ${token}` }, // Incluir token
    });
    return data;
});

// Eliminar un producto
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    const token = getToken(); // Recuperamos el token
    const { data } = await axios.delete(`${URL_API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Incluir token
    });
    return data;
});

// Slice de Redux para manejar el estado de los productos
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
                const index = state.products.findIndex((product) => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product.id !== action.payload.id);
            });
    },
});

export default productSlice.reducer;
