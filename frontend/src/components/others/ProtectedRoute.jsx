import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content
  return children;
}

export default ProtectedRoute;
