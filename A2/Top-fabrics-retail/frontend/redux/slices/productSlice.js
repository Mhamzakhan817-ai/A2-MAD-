// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
} from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => await getAllProducts()
);

export const fetchFeatured = createAsyncThunk(
  "products/fetchFeatured",
  async () => await getFeaturedProducts()
);

export const fetchProductById = createAsyncThunk(
  "products/fetchOne",
  async (id) => await getProductById(id)
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    featured: [],
    single: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      // Load all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      // Load featured
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featured = action.payload;
      })

      // Load single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.single = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
