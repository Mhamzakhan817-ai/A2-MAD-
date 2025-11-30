// redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleWishlist } from "../../services/userService";
import { getProductById } from "../../services/productService";

export const handleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async ({ userId, productId }) => {
    return await toggleWishlist(userId, productId);
  }
);

export const fetchWishlistProducts = createAsyncThunk(
  "wishlist/products",
  async (wishlist) => {
    const promises = wishlist.map((id) => getProductById(id));
    return Promise.all(promises);
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],            // product IDs
    products: [],         // full product details
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleWishlist.fulfilled, (state, action) => {
        state.items = action.payload.wishlist;
      })
      .addCase(fetchWishlistProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
