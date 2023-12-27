import axios from "axios";
import Cookies from "js-cookie";

import { API_URL, API_ACCOUNT_URL } from "../constants";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    // const user = localStorage.getItem("user");
    const user = Cookies.get("user");

    if (user) {
      const token = JSON.parse(user)?.data?.accessToken;

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // const user = localStorage.getItem("user");
      const user = Cookies.get("user");

      if (user) {
        try {
          const accessToken = JSON.parse(user)?.data?.accessToken;
          const refreshToken = JSON.parse(user)?.data?.refreshToken;

          const response = await instance.post(
            `${API_ACCOUNT_URL}/refresh-token`,
            {
              accessToken,
              refreshToken,
            }
          );

          const { data } = response;

          Cookies.set("user", JSON.stringify(data));

          originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;

          return instance(originalRequest);
        } catch (err) {
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
