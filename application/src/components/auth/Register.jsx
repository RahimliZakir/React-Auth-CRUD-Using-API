import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const auth = useAuth();

  const handleRegister = (values, { resetForm }) => {
    auth.register(values);

    //* clears the state
    resetForm();
  };

  return (
    <Container>
      <Row className="vh-100 align-items-center justify-content-center">
        <div className="col-8">
          <h1 className="text-center mb-3">Register Page</h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.username) errors.username = "username is required";

              if (!values.email) errors.email = "email is required";
              else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              )
                errors.email = "email is not valid";

              if (!values.password) errors.password = "password is required";
              else if (values.password.length < 8)
                errors.password = "password must be a minimum of 8 characters";

              if (!values.passwordConfirm)
                errors.passwordConfirm = "password confirm is required";
              else if (values.passwordConfirm.length < 8)
                errors.passwordConfirm =
                  "password confirm must be a minimum of 8 characters";

              if (
                values.password &&
                values.passwordConfirm &&
                values.password !== values.passwordConfirm
              ) {
                errors.password = "passwords must be a equal";
                errors.passwordConfirm = "passwords must be a equal";
              }

              return errors;
            }}
            onSubmit={handleRegister}
          >
            <Form>
              <Field
                type="text"
                className="form-control mb-2"
                placeholder="username"
                name="username"
              />
              <ErrorMessage
                className="text-danger mb-2"
                name="username"
                component="div"
              />

              <Field
                type="text"
                className="form-control mb-2"
                placeholder="email"
                name="email"
              />
              <ErrorMessage
                className="text-danger mb-2"
                name="email"
                component="div"
              />

              <Field
                type="password"
                className="form-control mb-2"
                placeholder="password"
                name="password"
              />
              <ErrorMessage
                className="text-danger mb-2"
                name="password"
                component="div"
              />

              <Field
                type="password"
                className="form-control mb-2"
                placeholder="password confirm"
                name="passwordConfirm"
              />
              <ErrorMessage
                className="text-danger mb-2"
                name="passwordConfirm"
                component="div"
              />

              <button type="submit" className="btn btn-success">
                Register
              </button>
            </Form>
          </Formik>
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
