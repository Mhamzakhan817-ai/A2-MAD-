// app/order/checkout.js
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import { clearCart } from "../../redux/slices/cartSlice";
import api from "../../services/apiClient";

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user?.id);
  const { items } = useSelector((state) => state.cart);

  // Total price
  const total = items.reduce(
    (sum, i) => sum + i.product_id.price * i.quantity,
    0
  );

  // Form state
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const placeOrder = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.city) {
      Alert.alert("Missing fields", "Please fill all required fields.");
      return;
    }

    try {
      const res = await api.post("/orders/create", {
        userId,
        items,
        total,
        shipping: form,
      });

      dispatch(clearCart());
      router.replace("/order/success");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to place order.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.summaryBox}>
        {items.map((item) => (
          <View key={item._id} style={styles.row}>
            <Text>{item.product_id.name}</Text>
            <Text>
              Rs. {item.product_id.price} × {item.quantity}
            </Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>Rs. {total}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Shipping Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={form.name}
        onChangeText={(v) => updateField("name", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(v) => updateField("phone", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Address"
        value={form.address}
        onChangeText={(v) => updateField("address", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={form.city}
        onChangeText={(v) => updateField("city", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes (optional)"
        value={form.notes}
        onChangeText={(v) => updateField("notes", v)}
      />

      <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 10,
  },

  summaryBox: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 8,
    borderColor: "#ddd",
  },
  totalText: { fontSize: 18, fontWeight: "700" },
  totalAmount: { fontSize: 18, fontWeight: "700", color: "#1a73e8" },

  input: {
    backgroundColor: "#f3f3f3",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  placeOrderBtn: {
    backgroundColor: "#1a73e8",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  placeOrderText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
