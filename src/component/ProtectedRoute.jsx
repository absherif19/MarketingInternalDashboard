import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const username = Cookies.get("username");

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
