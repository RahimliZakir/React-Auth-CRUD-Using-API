import axios from "axios";

import { API_URL, API_ACCOUNT_URL } from "../constants";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");

    if (user) {
      const token = JSON.parse(user)?.data?.accessToken;

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  async (config) => {
    const user = localStorage.getItem("user");

    if (user) {
      const accessToken = JSON.parse(user)?.data?.accessToken;
      const refreshToken = JSON.parse(user)?.data?.refreshToken;

      try {
        const data = await instance.post(`${API_ACCOUNT_URL}/refresh-token`, {
          accessToken,
          refreshToken,
        });

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

    return config;
  },
  (err) => {}
);

export default instance;
