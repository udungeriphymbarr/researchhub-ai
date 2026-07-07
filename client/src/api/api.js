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
  console.log("401 Unauthorized");
}

  return response;
};