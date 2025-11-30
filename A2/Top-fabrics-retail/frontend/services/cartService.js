import api from "./apiClient";

export const addToCart = async (user_id, product_id, quantity) => {
  const res = await api.post("/cart/add", {
    user_id,
    product_id,
    quantity,
  });
  return res.data;
};

export const getCart = async (user_id) => {
  const res = await api.get(`/cart/${user_id}`);
  return res.data;
};

export const removeCartItem = async (itemId) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};
