import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  const isLoggedIn = !!localStorage.getItem("currentUser");

  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute;
