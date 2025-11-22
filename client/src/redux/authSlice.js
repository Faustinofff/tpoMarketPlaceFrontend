import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:4002/api/v1/auth/authenticate";

// Thunk para iniciar sesión
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

// Cargar token desde localStorage si existe
const savedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: savedToken || null,
    role: savedToken ? JSON.parse(atob(savedToken.split(".")[1])).role : null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        localStorage.setItem("token", action.payload);

        const payload = JSON.parse(atob(action.payload.split(".")[1]));
        state.role = payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
