import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";

import { fetchProductById } from "../redux/slices/productSlice";
import { addItem } from "../redux/slices/cartSlice";

import WishlistIcon from "../components/WishlistIcon";
import ToastMessage from "../components/ToastMessage";

import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

import { formatPrice } from "../utils/formatPrice";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const { single: product, loading } = useSelector((state) => state.products);
  const userId = useSelector((state) => state.auth.user?.id);

  const [toastVisible, setToastVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const animationRef = useRef(null);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id]);

  if (loading || !product) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  // Add to Cart
  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }

    await dispatch(
      addItem({
        userId,
        productId: product._id,
        quantity,
      })
    );

    // Show animations + toast
    animationRef.current?.play();
    setToastVisible(true);
    setShowModal(false);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Image source={{ uri: product.image_url }} style={styles.image} />

        <View style={styles.headerRow}>
          <Text style={styles.name}>{product.name}</Text>
          <WishlistIcon productId={product._id} />
        </View>

        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        <Text style={styles.desc}>{product.description}</Text>

        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lottie Success Animation */}
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/success.json")}
        style={styles.lottie}
        autoPlay={false}
        loop={false}
      />

      {/* Toast */}
      <ToastMessage message="Added to cart!" visible={toastVisible} />

      {/* Quantity Selector Modal */}
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        style={styles.modal}
      >
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Select Quantity</Text>

          <View style={styles.qtyRow}>
            {[1, 2, 3, 4].map((q) => (
              <TouchableOpacity
                key={q}
                style={[
                  styles.qtyButton,
                  quantity === q && styles.qtyButtonActive,
                ]}
                onPress={() => setQuantity(q)}
              >
                <Text
                  style={[
                    styles.qtyText,
                    quantity === q && styles.qtyTextActive,
                  ]}
                >
                  {q} yard{q > 1 ? "s" : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.modalAdd}
            onPress={handleAddToCart}
          >
            <Text style={styles.modalAddText}>Add {quantity} to Cart</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  loaderWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300, borderRadius: 12, marginBottom: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 26, fontWeight: "700" },
  price: { fontSize: 22, fontWeight: "700", color: "#1a73e8", marginVertical: 10 },
  desc: { fontSize: 16, lineHeight: 22, marginBottom: 20 },

  cartBtn: {
    backgroundColor: "#1a73e8",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  cartBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },

  lottie: {
    width: 130,
    height: 130,
    position: "absolute",
    top: "40%",
    left: "35%",
    zIndex: 100,
    display: "none",
  },

  // Modal styles
  modal: { justifyContent: "flex-end", margin: 0 },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  qtyRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  qtyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  qtyButtonActive: { backgroundColor: "#1a73e8" },
  qtyText: { fontSize: 16, color: "#444" },
  qtyTextActive: { color: "#fff" },

  modalAdd: {
    backgroundColor: "#1a73e8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalAddText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
