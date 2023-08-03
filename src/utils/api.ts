import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
