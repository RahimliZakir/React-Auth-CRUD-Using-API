import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../hooks/useAuth";

const SignIn = () => {
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username is required"),
      password: Yup.string()
        .required("password is required")
        .min(8, "password must be a minimum of 8 characters"),
    }),
    onSubmit: (values) => {
      auth.signIn(values);
    },
  });

  const [hasChanged, setHasChanged] = useState({});

  const handleFieldChange = (fieldName, e) => {
    setHasChanged({ ...hasChanged, [fieldName]: true });
    formik.handleChange(fieldName)(e.target.value);
  };

  return (
    <Container>
      <Row className="vh-100 align-items-center justify-content-center">
        <div className="col-8">
          <h1 className="text-center mb-3">Sign In Page</h1>
          <form onSubmit={formik.handleSubmit} className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {/* 1st way - Validation between values */}
            {formik.initialValues.username !== formik.values.username &&
              formik.errors.username && (
                <div className="text-danger mb-2">{formik.errors.username}</div>
              )}

            <input
              type="password"
              className="form-control mb-2"
              placeholder="password"
              name="password"
              onChange={(e) => handleFieldChange("password", e)}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {/* 2nd way - Validation with state and function */}
            {hasChanged.password && formik.errors.password && (
              <div className="text-danger mb-2">{formik.errors.password}</div>
            )}

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
