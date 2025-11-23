// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// URL del backend
const API_URL = "http://localhost:4002/api/v1/cart";

// 🔹 Acción asíncrona para sincronizar el carrito con el backend
export const syncAddToCart = createAsyncThunk(
  "cart/syncAddToCart",
  async ({ productId, quantity }, { getState }) => {
    const token = getState().auth.token; // Obtenemos token desde Redux
    const response = await fetch(
      `${API_URL}/add?productId=${productId}&quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al sincronizar el carrito con el servidor");
    }

    const data = await response.json();
    return data;
  }
);

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item.product.id === product.product.id
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.items.push(product);
      }
      state.total = state.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      state.total = state.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
    updateQuantity(state, action) {
      const { productId, quantityChange } = action.payload;
      const product = state.items.find(
        (item) => item.product.id === productId
      );

      if (product) {
        const newQuantity = product.quantity + quantityChange;
        if (newQuantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        } else {
          product.quantity = newQuantity;
        }
        state.total = state.items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
