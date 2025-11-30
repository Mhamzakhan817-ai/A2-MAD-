import { Animated, Text, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

export default function ToastMessage({ message, visible }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }, 1200);
      });
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
    opacity: 0.9,
  },
  text: { color: "#fff", textAlign: "center", fontSize: 16 },
});
