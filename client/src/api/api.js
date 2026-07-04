import { toast } from "react-toastify";

const API =
  import.meta.env.VITE_API_URL ||
  "https://researchhub-api-k9pv.onrender.com";

export default API;

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.error("Your session has expired. Please login again.");

    window.location.href = "/login";

    return;
  }

  return response;
};