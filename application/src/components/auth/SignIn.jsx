import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <Container>
      <Row className="vh-100 align-items-center justify-content-center">
        <div className="col-8">
          <h1 className="text-center mb-3">Sign In Page</h1>
          <form onSubmit={handleSignIn} className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="username"
              value={signInData.username}
              onChange={(e) => handleInputChange("username", e)}
            />
            <input
              type="password"
              className="form-control  mb-2"
              placeholder="password"
              value={signInData.password}
              onChange={(e) => handleInputChange("password", e)}
            />
            <button type="submit" className="btn btn-success">
              Sign In
            </button>
          </form>
          <span>
            If you don't have an account, you can go to
            <Link to="register" className="mx-1">
              register
            </Link>
            page.
          </span>
        </div>
      </Row>
    </Container>
  );
};

export default SignIn;
