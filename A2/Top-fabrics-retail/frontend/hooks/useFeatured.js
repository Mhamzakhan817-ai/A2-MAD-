// hooks/useFeatured.js
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../services/productService";

export default function useFeatured() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await getFeaturedProducts();
        setFeatured(data);
      } catch (err) {
        console.log("Error fetching featured:", err);
      }
    }

    loadFeatured();
  }, []);

  return { featured };
}
