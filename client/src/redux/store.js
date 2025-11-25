// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice"; // Tu slice de listado
import productDetailReducer from "./productDetailSlice"; // ¡NUEVO!
import categoryReducer from "./categorySlice"; // ¡NUEVO!
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer, // Agregado
    categories: categoryReducer, // Agregado
    cart: cartReducer,
    auth: authReducer,
  },
});