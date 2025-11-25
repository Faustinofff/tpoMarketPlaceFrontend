
// src/redux/cartSlice.js (El mismo que me diste, con la thunk renombrada y mejor manejo de error)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Usa 'axios' si quieres mantener consistencia, pero 'fetch' funciona. Usaré fetch ya que lo tenías.

const API_URL = "http://localhost:4002/api/v1/cart";


export const syncCartWithBackend = createAsyncThunk( // ¡Renombrada!
  "cart/syncCartWithBackend",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    
    // Validamos el token antes de la llamada (mejor control de error)
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
              'Content-Type': 'application/json', // Añadir Content-Type es buena práctica
            },
          }
        );
    
        if (!response.ok) {
            // Manejamos errores de la API (4xx, 5xx)
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al sincronizar el carrito con el servidor");
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        // Manejamos errores de red o el error lanzado arriba
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
        // NOTA: Tu lógica busca product.product.id, asumo que payload es { product: {...}, quantity: 1}
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
    // ... (resto de tus reducers: removeFromCart, clearCart, updateQuantity)
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
  // Opcional: extraReducers para manejar el estado de carga de la sincronización si lo deseas
  extraReducers: (builder) => {
    // Si la sincronización es exitosa, no hacemos nada (el addToCart local ya actualizó el estado)
    builder.addCase(syncCartWithBackend.fulfilled, (state, action) => {
        // Podrías registrar un éxito o actualizar algo si la respuesta del backend lo exige
    })
    .addCase(syncCartWithBackend.rejected, (state, action) => {
        // En caso de fallo, podrías revertir la acción local de addToCart si fuera crítico, 
        // pero generalmente solo lo manejamos con el toast en el componente.
        console.error("Fallo la sincronizacion del carrito:", action.payload);
    });
  }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;