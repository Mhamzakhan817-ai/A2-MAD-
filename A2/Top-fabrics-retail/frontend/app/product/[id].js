// app/product/[id].js

import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";

import { fetchProductById } from "../../redux/slices/productSlice";
import WishlistIcon from "../../components/WishlistIcon";
import CartButton from "../../components/CartButton";
import { formatPrice } from "../../utils/formatPrice";

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const { single: product, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  if (loading || !product) {
    return (
      <ActivityIndicator size="large" color="#1a73e8" style={{ marginTop: 80 }} />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image_url }} style={styles.image} />

      {/* Title + Wishlist */}
      <View style={styles.row}>
        <Text style={styles.name}>{product.name}</Text>
        <WishlistIcon productId={product._id} />
      </View>

      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      <Text style={styles.desc}>{product.description}</Text>

      {/* Add to cart */}
      <CartButton product={product} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 320, borderRadius: 12, marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 26, fontWeight: "700" },
  price: { fontSize: 22, fontWeight: "700", color: "#1a73e8", marginVertical: 10 },
  desc: { fontSize: 16, lineHeight: 22, color: "#444", marginBottom: 20 },
});
