import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7074/api",
});

instance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      const token = JSON.parse(user)?.data?.accessToken;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
