import { lazy } from "react";
import { Route } from "react-router-dom";

// Layout
import AdminLayout from "../components/layout/AdminLayout";
import { DealerManagement } from "../pages/admin";

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const CarManagement = lazy(() => import("../pages/admin/CarManagement"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));
const BikeManagement = lazy(() => import("../pages/admin/bikeManagement"));
const EventManagement = lazy(() => import("../pages/admin/EventManagement"));
const AnalyticsPage = lazy(() => import("../pages/admin/AnalyticsPage"));
const HomePageManagement = lazy(() =>
  import("../pages/admin/HomePageManagement")
);

const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="cars" element={<CarManagement />} />
    <Route path="bikes" element={<BikeManagement />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="events" element={<EventManagement />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    <Route path="homepage" element={<HomePageManagement />} />
    <Route path="dealers" element={<DealerManagement />} />
  </Route>
);

export default AdminRoutes;
