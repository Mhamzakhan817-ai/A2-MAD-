import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, StyleSheet, ActivityIndicator } from "react-native";

import { fetchProducts, fetchFeatured } from "../redux/slices/productSlice";

import FeaturedCarousel from "../components/FeaturedCarousel";
import ProductGrid from "../components/ProductGrid";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const { items: products, featured, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFeatured());
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#1a73e8"
        style={{ marginTop: 100 }}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Top Fabrics Retail</Text>

      {/* Featured Fabrics */}
      {featured.length > 0 && <FeaturedCarousel featured={featured} />}

      {/* All Fabrics */}
      {products.length > 0 && (
        <ProductGrid products={products} onSelect={() => {}} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
});
