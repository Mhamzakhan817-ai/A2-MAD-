// redux/slices/cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, getCart, removeCartItem } from "../../services/cartService";

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (userId) => await getCart(userId)
);

export const addItem = createAsyncThunk(
  "cart/add",
  async ({ userId, productId, quantity }) =>
    await addToCart(userId, productId, quantity)
);

export const deleteItem = createAsyncThunk(
  "cart/delete",
  async (itemId) => await removeCartItem(itemId)
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addItem.fulfilled, () => {})
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (i) => i._id !== action.meta.arg
        );
      });
  },
});

export default cartSlice.reducer;
