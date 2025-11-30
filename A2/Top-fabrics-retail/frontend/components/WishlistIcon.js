import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleWishlist } from "../redux/slices/wishlistSlice";

export default function WishlistIcon({ productId }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const wishlist = useSelector((state) => state.wishlist.items);

  const isLiked = wishlist.includes(productId);

  const toggle = () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    dispatch(handleWishlist({ userId, productId }));
  };

  return (
    <TouchableOpacity onPress={toggle}>
      <Ionicons
        name={isLiked ? "heart" : "heart-outline"}
        size={28}
        color={isLiked ? "red" : "#777"}
      />
    </TouchableOpacity>
  );
}
