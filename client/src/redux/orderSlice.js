// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// URL del backend para las órdenes
const API_URL = "http://localhost:4002/api/v1/orders";

// Acción para realizar el checkout
export const checkoutOrder = createAsyncThunk(
  "order/checkoutOrder",
  async (orderData, { getState }) => {
    const token = getState().auth.token;
    const { items, total } = getState().cart;

    const response = await fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        shipping: orderData.shippingInfo,
        payment: orderData.paymentInfo,
        cart: { items, total },
      }),
    });

    if (!response.ok) {
      throw new Error("Error al realizar el checkout");
    }

    const data = await response.json();
    return data; // Aquí puedes retornar los datos de la orden confirmada
  }
);

const initialState = {
  orderDetails: null,
  status: "idle", // "idle", "loading", "succeeded", "failed"
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload; // Aquí guardas la orden confirmada
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
