import api from "./apiClient";


export const createOrder = async (user_id, items, total_amount) => {
const res = await api.post("/orders/create", {
user_id,
items,
total_amount,
});
return res.data;
};


export const getOrders = async (user_id) => {
const res = await api.get(`/orders/${user_id}`);
return res.data;
};