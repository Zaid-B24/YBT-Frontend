import React from "react";
import { NavLink } from "react-router-dom";
//import "./Sidebar.css"; // We'll add some basic CSS for layout

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/cars">Manage Cars</NavLink>
          </li>
          {/* Add other admin links here */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
