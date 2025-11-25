

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_URL = "http://localhost:4002/api/v1/cart";


export const syncCartWithBackend = createAsyncThunk( 
  "cart/syncCartWithBackend",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    
    
    if (!token) {
        return rejectWithValue({ message: "No autenticado", code: 401 }); 
    }

    try {
        const response = await fetch(
          `${API_URL}/add?productId=${productId}&quantity=${quantity}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json', 
            },
          }
        );
    
        if (!response.ok) {
            
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al sincronizar el carrito con el servidor");
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        
        return rejectWithValue({ message: error.message || "Error desconocido al sincronizar" });
    }
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
  
  extraReducers: (builder) => {
    
    builder.addCase(syncCartWithBackend.fulfilled, (state, action) => {
        
    })
    .addCase(syncCartWithBackend.rejected, (state, action) => {
        
        console.error("Fallo la sincronizacion del carrito:", action.payload);
    });
  }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;