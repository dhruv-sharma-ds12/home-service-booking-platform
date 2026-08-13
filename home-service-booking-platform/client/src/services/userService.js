import { apiRequest } from "./api";

// ==========================================
// GET CURRENT USER PROFILE
// ==========================================

export const getMyProfile = async () => {
  return await apiRequest("/users/me");
};


// ==========================================
// UPDATE CURRENT USER PROFILE
// ==========================================

export const updateMyProfile = async (profileData) => {
  return await apiRequest("/users/me", {
    method: "PUT",
    body: JSON.stringify(profileData),
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