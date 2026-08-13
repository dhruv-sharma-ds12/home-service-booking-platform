import { createContext, useContext, useState } from "react";

import {
  register as registerUser,
  login as loginUser,
  logout as logoutUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // =========================
  // CURRENT LOGGED-IN USER
  // =========================

  const [user, setUser] = useState(() => {
    return getCurrentUser();
  });

  // =========================
  // REGISTER
  // =========================

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);

      return {
        success: true,
        user: data.user,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || "Registration failed.",
      };
    }
  };

  // =========================
  // LOGIN
  // =========================

  const login = async (email, password) => {
    try {
      const data = await loginUser({
        email,
        password,
      });

      setUser(data.user);

      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed.",
      };
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // =========================
  // AUTH STATUS
  // =========================

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}