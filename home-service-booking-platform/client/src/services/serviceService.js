import { apiRequest } from "./api";

// ==========================================
// GET ALL SERVICES - ADMIN
// ==========================================

export const getServices = async () => {
  return await apiRequest("/services");
};


// ==========================================
// GET ACTIVE SERVICES - PUBLIC
// ==========================================

export const getActiveServices = async () => {
  return await apiRequest("/services/active");
};


// ==========================================
// CREATE SERVICE
// ==========================================

export const createService = async (serviceData) => {
  return await apiRequest("/services", {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
};


// ==========================================
// UPDATE SERVICE
// ==========================================

export const updateService = async (id, serviceData) => {
  return await apiRequest(`/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(serviceData),
  });
};


// ==========================================
// DELETE SERVICE
// ==========================================

export const deleteService = async (id) => {
  return await apiRequest(`/services/${id}`, {
    method: "DELETE",
  });
};