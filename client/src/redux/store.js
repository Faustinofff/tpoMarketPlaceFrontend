import{configureStore}from"@reduxjs/toolkit";
import productsReducer from"./productSlice.js";

export const store=configureStore({
    reducer: {products: productsReducer},
});

