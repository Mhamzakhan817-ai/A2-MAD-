// app/(tabs)/account.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useRouter } from "expo-router";

export default function AccountTab() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // ❗ If NOT logged in → Show Login button
  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>You're not logged in</Text>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✔ Logged-in UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          dispatch(logout());
          router.replace("/auth/login");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30 },

  card: {
    backgroundColor: "#f3f7ff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  label: { fontSize: 14, color: "#666", marginTop: 10 },
  value: { fontSize: 18, fontWeight: "600", marginTop: 2 },

  loginBtn: {
    backgroundColor: "#1a73e8",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "600" },

  logoutBtn: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
