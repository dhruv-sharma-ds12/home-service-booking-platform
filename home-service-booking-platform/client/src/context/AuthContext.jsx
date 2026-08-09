import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // =========================
  // CURRENT LOGGED-IN USER
  // =========================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("truefixUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // =========================
  // REGISTER
  // =========================

  const register = (userData) => {
    const existingUsers =
      JSON.parse(localStorage.getItem("truefixUsers")) || [];

    // Check whether email already exists
    const existingUser = existingUsers.find(
      (item) =>
        item.email.toLowerCase() ===
        userData.email.trim().toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    // Create new customer
    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim(),
      password: userData.password,
      role: "customer",
    };

    // Save user to registered users
    existingUsers.push(newUser);

    localStorage.setItem(
      "truefixUsers",
      JSON.stringify(existingUsers)
    );

    return {
      success: true,
      user: newUser,
    };
  };

  // =========================
  // LOGIN
  // =========================

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // =========================
    // DEMO ADMIN ACCOUNT
    // =========================

    if (
      cleanEmail === "admin@truefix.com" &&
      password === "admin123"
    ) {
      const adminUser = {
        name: "TrueFix Admin",
        email: "admin@truefix.com",
        role: "admin",
      };

      setUser(adminUser);

      localStorage.setItem(
        "truefixUser",
        JSON.stringify(adminUser)
      );

      return {
        success: true,
        user: adminUser,
      };
    }

    // =========================
    // CUSTOMER LOGIN
    // =========================

    const existingUsers =
      JSON.parse(localStorage.getItem("truefixUsers")) || [];

    const foundUser = existingUsers.find(
      (item) =>
        item.email === cleanEmail &&
        item.password === password
    );

    // Wrong email/password
    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    // Don't store password in logged-in user
    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role,
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "truefixUser",
      JSON.stringify(loggedInUser)
    );

    return {
      success: true,
      user: loggedInUser,
    };
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    setUser(null);
    localStorage.removeItem("truefixUser");
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