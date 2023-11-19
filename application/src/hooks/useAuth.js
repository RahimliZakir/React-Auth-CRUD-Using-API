import API from "../api";

export const useAuth = () => {
  const API_URL = `${API.defaults.baseURL}/account`;

  const register = (formData) => {
    return API.post(`${API_URL}/register`, formData);
  };

  const signIn = (formData) => {
    return API.post(`${API_URL}/signin`, formData)
      .then((resp) => {
        if (resp.status === 200)
          localStorage.setItem("user", JSON.stringify(resp.data));

        return resp.data;
      })
      .catch((err) => console.log(err));
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const hasToken = () => {
    return localStorage.getItem("user") !== null;
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  return {
    register,
    signIn,
    getCurrentUser,
    hasToken,
    logout,
  };
};
