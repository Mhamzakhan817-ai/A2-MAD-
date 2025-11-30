import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import AppInput from "../components/UI/AppInput";
import AppButton from "../components/UI/AppButton";
import { login } from "../redux/slices/authSlice";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const result = await dispatch(login({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      router.replace("(tabs)");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <AppInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <AppInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton
        title={loading ? "Logging in..." : "Login"}
        onPress={onLogin}
      />

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30 },
  link: {
    color: "#1a73e8",
    marginTop: 15,
    textAlign: "center",
    fontWeight: "600",
  },
});
