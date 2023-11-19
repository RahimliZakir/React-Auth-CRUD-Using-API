import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import Loader from "../Loader";

const RouteGuard = ({ component: Component }) => {
  const auth = useAuth();

  return auth.hasToken() ? (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  ) : (
    <Navigate to="/signin" />
  );
};

export default RouteGuard;
