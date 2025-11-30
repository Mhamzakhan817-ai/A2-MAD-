// redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔵 LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const data = await loginUser(email, password);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.token);
    return data;
  }
);

// 🟣 SIGNUP
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    const data = await signupUser(name, email, password);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    await AsyncStorage.setItem("token", data.token);
    return data;
  }
);

// 🔐 LOAD user from storage
export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const user = await AsyncStorage.getItem("user");
  const token = await AsyncStorage.getItem("token");
  return { user: JSON.parse(user), token };
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
