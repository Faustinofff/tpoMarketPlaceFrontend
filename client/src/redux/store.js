// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import cartReducer from './cartSlice'; // Asegúrate de que cartReducer esté importado

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,  // Aquí añadimos el reducer del carrito
  },
});
