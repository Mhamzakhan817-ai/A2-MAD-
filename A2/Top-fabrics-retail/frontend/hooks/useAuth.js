// hooks/useAuth.js
import { useState } from "react";
import { loginUser, signupUser } from "../services/userService";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await loginUser(email, password);
      setUser(res.user);
      setToken(res.token);
      return true;
    } catch (err) {
      console.log("Login error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      await signupUser(name, email, password);
      return true;
    } catch (err) {
      console.log("Signup error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, token, loading, login, signup };
}
