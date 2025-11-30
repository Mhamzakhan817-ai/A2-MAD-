// hooks/useWishlist.js
import { useState } from "react";
import { toggleWishlist } from "../services/userService";

export default function useWishlist(userId) {
  const [wishlist, setWishlist] = useState([]);

  const toggle = async (productId) => {
    try {
      const data = await toggleWishlist(userId, productId);
      setWishlist(data.wishlist);
    } catch (err) {
      console.log("Error updating wishlist:", err);
    }
  };

  const isLiked = (productId) => wishlist.includes(productId);

  return { wishlist, toggle, isLiked };
}
