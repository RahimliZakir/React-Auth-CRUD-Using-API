import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7074/api",
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
