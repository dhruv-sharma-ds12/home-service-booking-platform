import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  register as registerUser,
  login as loginUser,
  logout as logoutUser,
  getCurrentUser,
} from "../services/authService";

import { getMyProfile } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ==========================================
  // INITIAL USER
  // ==========================================

  const [user, setUser] = useState(() => {
    return getCurrentUser();
  });

  // Initial authentication/profile check
  const [loadingUser, setLoadingUser] = useState(true);

  // Login/logout authentication operations
  const [loadingAuth, setLoadingAuth] = useState(false);

  // ==========================================
  // LOAD CURRENT USER
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const loadCurrentProfile = async () => {
      const token = localStorage.getItem("token");

      // No token = definitely logged out
      if (!token) {
        if (mounted) {
          setUser(null);
          setLoadingUser(false);
        }

        return;
      }

      try {
        const data = await getMyProfile();

        if (!mounted) {
          return;
        }

        if (data?.user) {
          setUser(data.user);

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        } else {
          // Token exists but backend returned no user
          logoutUser();
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Load current profile error:",
          error
        );

        if (!mounted) {
          return;
        }

        /*
         * Only invalidate the session when the
         * error clearly indicates an authentication
         * problem.
         */

        const message =
          error?.message?.toLowerCase() || "";

        const authenticationError =
          message.includes("authentication") ||
          message.includes("invalid") ||
          message.includes("expired") ||
          message.includes("unauthorized");

        if (authenticationError) {
          logoutUser();
          setUser(null);
        } else {
          /*
           * Backend/network problem:
           * keep the locally stored user.
           */
          const storedUser = getCurrentUser();

          if (storedUser) {
            setUser(storedUser);
          }
        }
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    };

    loadCurrentProfile();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);

      return {
        success: true,
        user: data?.user || null,
        message:
          data?.message ||
          "User registered successfully.",
      };
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      return {
        success: false,
        user: null,
        message:
          error?.message ||
          "Registration failed.",
      };
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (email, password) => {
    setLoadingAuth(true);

    try {
      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!data?.token || !data?.user) {
        return {
          success: false,
          user: null,
          token: null,
          message:
            "Login failed. Invalid server response.",
        };
      }

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      return {
        success: true,
        user: data.user,
        token: data.token,
        message:
          data.message ||
          "Login successful.",
      };
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      return {
        success: false,
        user: null,
        token: null,
        message:
          error?.message ||
          "Login failed.",
      };
    } finally {
      setLoadingAuth(false);
    }
  };

  // ==========================================
  // UPDATE USER
  // ==========================================

  const updateUser = (updatedUser) => {
    if (!updatedUser) {
      return;
    }

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = async () => {
    setLoadingAuth(true);

    try {
      /*
       * Currently logoutUser() is synchronous
       * because it only removes localStorage data.
       *
       * Keeping this inside an async function makes
       * the AuthContext ready if a backend logout
       * request is added later.
       */

      logoutUser();

      setUser(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  // ==========================================
  // AUTHENTICATION STATUS
  // ==========================================

  const isAuthenticated =
    Boolean(user) &&
    Boolean(localStorage.getItem("token"));

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

        // Initial session/profile loading
        loadingUser,

        // Real login/logout operation loading
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// useAuth
// ==========================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}