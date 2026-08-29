const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001/api";

export const apiRequest = async (
  endpoint,
  options = {}
) => {
  try {
    const token =
      localStorage.getItem("token");

    const headers = {
      "Content-Type":
        "application/json",
      ...(options.headers || {}),
    };

    // Attach token only when one exists.
    if (token) {
      headers.Authorization =
        `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    const data =
      await response
        .json()
        .catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Something went wrong."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "API request error:",
      error
    );

    throw error;
  }
};