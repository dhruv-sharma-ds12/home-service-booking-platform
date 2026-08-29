import { apiRequest } from "./api";

// ==========================================
// SEND CONTACT MESSAGE
// PUBLIC
// ==========================================

export const sendContactMessage = async (
  contactData
) => {
  return await apiRequest("/contacts", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
};

// ==========================================
// ADMIN - GET ALL CONTACT MESSAGES
// ==========================================

export const getContactMessages = async () => {
  return await apiRequest("/contacts", {
    method: "GET",
  });
};

// ==========================================
// ADMIN - UPDATE CONTACT STATUS
// ==========================================

export const updateContactStatus = async (
  contactId,
  status
) => {
  return await apiRequest(
    `/contacts/${contactId}/status`,
    {
      method: "PUT",
      body: JSON.stringify({
        status,
      }),
    }
  );
};

// ==========================================
// ADMIN - DELETE CONTACT
// ==========================================

export const deleteContactMessage = async (
  contactId
) => {
  return await apiRequest(
    `/contacts/${contactId}`,
    {
      method: "DELETE",
    }
  );
};