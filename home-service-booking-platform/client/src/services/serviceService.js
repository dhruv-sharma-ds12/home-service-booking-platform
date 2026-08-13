import { apiRequest } from "./api";

// Get all services
export const getServices = async () => {
  return await apiRequest("/services", {
    method: "GET",
  });
};

// Get one service
export const getServiceById = async (serviceId) => {
  return await apiRequest(`/services/${serviceId}`, {
    method: "GET",
  });
};