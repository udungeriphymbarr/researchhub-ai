const API =
  import.meta.env.VITE_API_URL ||
  "https://researchhub-api-k9pv.onrender.com";

export default API;

export const authFetch = async (
  url,
  options = {}
) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
    return;
  }

  return response;
};