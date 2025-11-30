import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import AppInput from "../components/UI/AppInput";
import AppButton from "../components/UI/AppButton";
import { signup } from "../redux/slices/authSlice";

export default function SignupScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async () => {
    const result = await dispatch(signup({ name, email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      router.replace("(tabs)");
    } else {
      alert("Signup failed!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <AppInput placeholder="Name" value={name} onChangeText={setName} />

      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <AppInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <AppButton
        title={loading ? "Creating..." : "Sign Up"}
        onPress={onSignup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30 },
});
