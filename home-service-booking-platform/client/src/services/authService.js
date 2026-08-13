import { apiRequest } from "./api";

// Register a new customer
export const register = async (userData) => {
  return await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// Login existing user
export const login = async (credentials) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  // Save authentication information
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get currently stored user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

// Check whether a JWT exists
export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};