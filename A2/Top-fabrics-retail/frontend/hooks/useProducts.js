// hooks/useProducts.js
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.log("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading };
}
