import { apiRequest } from "./api";

// ==========================================
// GET MY PROFILE
// ==========================================

export const getMyProfile = async () => {
  return await apiRequest("/users/me");
};

// ==========================================
// UPDATE MY PROFILE
// ==========================================

export const updateMyProfile = async (
  profileData
) => {
  return await apiRequest("/users/me", {
    method: "PUT",

    body: JSON.stringify(profileData),
  });
};

// ==========================================
// CHANGE PASSWORD
// ==========================================

export const changePassword = async (
  passwordData
) => {
  return await apiRequest(
    "/users/change-password",
    {
      method: "PUT",

      body: JSON.stringify(passwordData),
    }
  );
};

// ==========================================
// DELETE MY ACCOUNT
// ==========================================

export const deleteMyAccount = async () => {
  return await apiRequest("/users/me", {
    method: "DELETE",
  });
};

// ==========================================
// ADMIN - GET ALL USERS
// ==========================================

export const getUsers = async () => {
  return await apiRequest("/users");
};

// ==========================================
// ADMIN - DELETE USER
// ==========================================

export const deleteUser = async (id) => {
  return await apiRequest(`/users/${id}`, {
    method: "DELETE",
  });
};