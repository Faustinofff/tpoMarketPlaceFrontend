// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL del backend para autenticación
const AUTH_URL = "http://localhost:4002/api/v1/auth/authenticate";

// Thunk asincrónico para login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(AUTH_URL, { email, password });
      return data.access_token;
    } catch (err) {
      return thunkAPI.rejectWithValue("Credenciales incorrectas");
    }
  }
);

// Slice de Redux para autenticación
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Acción para cerrar sesión
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;

        // Decodificar el payload del JWT para obtener el rol
        try {
          const payload = JSON.parse(atob(action.payload.split(".")[1]));
          state.role = payload.role;
        } catch (err) {
          state.role = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Exportar acciones y reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
