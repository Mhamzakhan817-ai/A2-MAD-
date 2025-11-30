// components/ProductCard.js
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProductCard({ item }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/product/${item._id}`)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Rs. {item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a73e8",
  },
});
