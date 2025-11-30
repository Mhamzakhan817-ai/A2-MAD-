// services/userService.js
import api from "./apiClient";

export const loginUser = async (email, password) => {
  const res = await api.post("/users/login", { email, password });
  return res.data; // must contain { user, token }
};

export const signupUser = async (name, email, password) => {
  const res = await api.post("/users/signup", { name, email, password });
  return res.data; // must contain { user, token }
};

export const toggleWishlist = async (userId, productId) => {
  const res = await api.post("/users/wishlist", { userId, productId });
  return res.data;
};
