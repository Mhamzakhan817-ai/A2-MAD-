import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import { fetchWishlist, toggleWishlist } from "../../redux/slices/wishlistSlice";
import { addItem } from "../../redux/slices/cartSlice";

export default function WishlistScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state) => state.auth.user?.id);
  const wishlist = useSelector((state) => state.wishlist.items);

  // Fetch wishlist on load
  useEffect(() => {
    if (userId) dispatch(fetchWishlist(userId));
  }, [userId]);

  // Not logged in
  if (!userId) {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Please login to view your wishlist.</Text>
      </View>
    );
  }

  // Empty wishlist
  if (!wishlist || wishlist.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Your wishlist is empty</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {wishlist.map((product) => (
        <View key={product._id} style={styles.card}>
          <Image source={{ uri: product.image_url }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Rs. {product.price}</Text>

            <View style={styles.btnRow}>
              {/* Move to Cart */}
              <TouchableOpacity
                style={styles.cartBtn}
                onPress={() =>
                  dispatch(
                    addItem({
                      userId,
                      productId: product._id,
                      quantity: 1,
                    })
                  )
                }
              >
                <Text style={styles.cartBtnText}>Add to Cart</Text>
              </TouchableOpacity>

              {/* Remove */}
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() =>
                  dispatch(toggleWishlist({ userId, productId: product._id }))
                }
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    color: "#1a73e8",
    marginVertical: 4,
    fontWeight: "600",
  },

  btnRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },

  cartBtn: {
    flex: 1,
    backgroundColor: "#1a73e8",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cartBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  removeBtn: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  removeText: {
    color: "#fff",
    fontWeight: "700",
  },
});
