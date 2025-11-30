import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import {
  fetchCart,
  deleteItem,
  updateQuantity,
} from "../../redux/slices/cartSlice";

export default function CartTab() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state) => state.auth.user?.id);
  const { items, loading } = useSelector((state) => state.cart);

  // Load cart on login
  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [userId]);

  // Calculate cart total
  const total = items.reduce(
    (sum, item) => sum + item.product_id.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(deleteItem(id));
  };

  const changeQty = (itemId, qty) => {
    dispatch(updateQuantity({ itemId, quantity: qty }));
  };

  // If user not logged in
  if (!userId) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>Please login to view your cart</Text>
      </View>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item) => (
          <View key={item._id} style={styles.card}>
            <Image
              source={{ uri: item.product_id.image_url }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.product_id.name}</Text>
              <Text style={styles.price}>
                Rs. {item.product_id.price * item.quantity}
              </Text>

              {/* Quantity Controls */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() =>
                    item.quantity > 1 &&
                    changeQty(item._id, item.quantity - 1)
                  }
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => changeQty(item._id, item.quantity + 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remove */}
            <TouchableOpacity onPress={() => handleRemove(item._id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Footer Total + Checkout */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rs. {total}</Text>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push("/order/checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoText: { fontSize: 18, fontWeight: "600", color: "#666" },

  card: {
    flexDirection: "row",
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginHorizontal: 10,
  },
  image: { width: 70, height: 70, borderRadius: 10, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { color: "#1a73e8", marginVertical: 6, fontWeight: "600" },

  remove: { color: "red", fontSize: 14, fontWeight: "700" },

  // Quantity controls
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 18, fontWeight: "700" },
  qtyNumber: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "700",
  },

  // Footer
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  total: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  checkoutBtn: {
    backgroundColor: "#1a73e8",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
