
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice"; 
import productDetailReducer from "./productDetailSlice"; 
import categoryReducer from "./categorySlice"; 
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer, 
    categories: categoryReducer, 
    cart: cartReducer,
    auth: authReducer,
  },
});