import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../admin/AdminNav";
import ProtectedRoute from "../admin/ProtectedRoute";

const AdminLayout = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="admin-container" style={{ display: "flex" }}>
        <AdminNav />
        <main className="admin-content" style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
