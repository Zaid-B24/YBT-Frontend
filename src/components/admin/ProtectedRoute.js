import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#0a0a0a",
          color: "#fff",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={requireAdmin ? "/admin" : "/login"} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
