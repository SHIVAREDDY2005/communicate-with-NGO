import axios from "axios";

const defaultApiBaseUrl = "http://localhost:5000/api";
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      if (!config.headers) {
        config.headers = {};
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    /* Auto logout if token expired */
    if (error.response && error.response.status === 401) {
      console.log("Session expired. Logging out.");

      localStorage.removeItem("token");

      const loginPath = `${import.meta.env.BASE_URL}login`;
      window.location.assign(loginPath);
    }

    return Promise.reject(error);
  }
);

export default api;
