import React, { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

const SignIn = () => {
  const auth = useAuth();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (item, e) => {
    setSignInData({ ...signInData, [item]: e.target.value });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    auth.signIn(signInData);
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          className="form-control"
          placeholder="username"
          value={signInData.username}
          onChange={(e) => handleInputChange("username", e)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="password"
          value={signInData.password}
          onChange={(e) => handleInputChange("password", e)}
        />
        <button type="submit" className="btn btn-success">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
