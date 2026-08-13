import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  register as registerUser,
  login as loginUser,
  logout as logoutUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // ==========================================
  // LOAD USER FROM LOCAL STORAGE
  // ==========================================

  const [user, setUser] = useState(() => {
    return getCurrentUser();
  });


  // ==========================================
  // REGISTER
  // ==========================================

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
          error.message ||
          "Registration failed.",
      };

    }
  };


  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (email, password) => {

    try {

      const data = await loginUser({
        email,
        password,
      });

      // authService already saves these,
      // but we also update React state.

      setUser(data.user);

      return {
        success: true,
        user: data.user,
        token: data.token,
      };

    } catch (error) {

      return {
        success: false,
        message:
          error.message ||
          "Login failed.",
      };

    }
  };


  // ==========================================
  // UPDATE USER
  // ==========================================

  const updateUser = (updatedUser) => {

    if (!updatedUser) {
      return;
    }

    // Update React state
    setUser(updatedUser);

    // IMPORTANT:
    // Save updated user so refresh doesn't
    // revert to the old profile.

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    logoutUser();

    setUser(null);
  };


  // ==========================================
  // AUTH STATUS
  // ==========================================

  const isAuthenticated =
    !!user &&
    !!localStorage.getItem("token");


  // ==========================================
  // CONTEXT
  // ==========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// ==========================================
// useAuth HOOK
// ==========================================

export function useAuth() {
  return useContext(AuthContext);
}