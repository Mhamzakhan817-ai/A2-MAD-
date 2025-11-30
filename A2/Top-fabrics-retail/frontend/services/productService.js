// services/productService.js
import api from "./apiClient";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getFeaturedProducts = async () => {
  const res = await api.get("/products/featured");
  return res.data;
};

// NEW — fetch single product
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
