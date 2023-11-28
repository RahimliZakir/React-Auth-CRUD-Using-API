import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <Container>
      <Row className="vh-100 align-items-center justify-content-center">
        <div className="col-8">
          <h1 className="text-center mb-3">Register Page</h1>
          <form onSubmit={handleSignIn} className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="username"
              value={registerData.username}
              onChange={(e) => handleInputChange("username", e)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="email"
              value={registerData.email}
              onChange={(e) => handleInputChange("email", e)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="password"
              value={registerData.password}
              onChange={(e) => handleInputChange("password", e)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="password confirm"
              value={registerData.passwordConfirm}
              onChange={(e) => handleInputChange("passwordConfirm", e)}
            />
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </form>
          <span>
            If you have an account, you can go to
            <Link to="/" className="mx-1">
              sign in
            </Link>
            page.
          </span>
        </div>
      </Row>
    </Container>
  );
};

export default Register;
