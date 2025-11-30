// hooks/useCart.js
import { useEffect, useState } from "react";
import { addToCart, getCart, removeCartItem } from "../services/cartService";

export default function useCart(userId) {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const data = await getCart(userId);
      setCart(data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  const add = async (productId, qty) => {
    try {
      await addToCart(userId, productId, qty);
      loadCart();
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  const remove = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      loadCart();
    } catch (err) {
      console.log("Error removing item:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return { cart, add, remove };
}
