import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const RouteGuard = ({ component: Component }) => {
  const auth = useAuth();

  return auth.hasToken() ? <Component /> : <Navigate to="/" />;
};

export default RouteGuard;
