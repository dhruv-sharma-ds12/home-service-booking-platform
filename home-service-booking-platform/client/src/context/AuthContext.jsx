import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("truefixUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {

    // Demo admin account
    if (
      email === "admin@truefix.com" &&
      password === "admin123"
    ) {
      const adminUser = {
        name: "TrueFix Admin",
        email: "admin@truefix.com",
        role: "admin"
      };

      setUser(adminUser);
      localStorage.setItem(
        "truefixUser",
        JSON.stringify(adminUser)
      );

      return {
        success: true,
        user: adminUser
      };
    }

    // Demo customer account
    const customerUser = {
      name: "Dhruv Sharma",
      email: email,
      role: "customer"
    };

    setUser(customerUser);

    localStorage.setItem(
      "truefixUser",
      JSON.stringify(customerUser)
    );

    return {
      success: true,
      user: customerUser
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("truefixUser");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}