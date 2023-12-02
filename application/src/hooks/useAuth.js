import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import API from "../api";
import { API_ACCOUNT_URL } from "../constants";

export const useAuth = () => {
  const API_URL = API_ACCOUNT_URL;

  const navigate = useNavigate();

  const register = (formData) => {
    return API.post(`${API_URL}/register`, formData)
      .then((resp) => {
        if (resp.status === 200) {
          navigate("/");
        }

        return resp.data;
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else console.log(err);
      });
  };

  const signIn = (formData) => {
    return API.post(`${API_URL}/signin`, formData)
      .then((resp) => {
        if (resp.status === 200) {
          localStorage.setItem("user", JSON.stringify(resp.data));
          navigate("/main/trucks");
        }

        return resp.data;
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else console.log(err);
      });
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const hasToken = () => {
    return localStorage.getItem("user") !== null;
  };

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/");
  };

  return {
    register,
    signIn,
    getCurrentUser,
    hasToken,
    logout,
  };
};
