import React, { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const auth = useAuth();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (item, e) => {
    setRegisterData({ ...registerData, [item]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth.register(registerData);
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          className="form-control"
          placeholder="username"
          value={registerData.username}
          onChange={(e) => handleInputChange("username", e)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="email"
          value={registerData.email}
          onChange={(e) => handleInputChange("email", e)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="password"
          value={registerData.password}
          onChange={(e) => handleInputChange("password", e)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="password confirm"
          value={registerData.passwordConfirm}
          onChange={(e) => handleInputChange("passwordConfirm", e)}
        />
        <button type="submit" className="btn btn-success">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Register;
