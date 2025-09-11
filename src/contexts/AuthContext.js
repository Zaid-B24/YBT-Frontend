import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");
    const adminToken = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");

    if (adminToken && adminData) {
      setIsAdmin(true);
      setUser(JSON.parse(adminData));
    } else if (userToken && userData) {
      setIsAdmin(false);
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  };

  const signup = async (name, email, password, confirmPassword) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to register");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await res.json(); // { token, user }

    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.removeItem("adminToken"); // Clear any admin session
    localStorage.removeItem("adminData");

    setIsAdmin(false);
    setUser(data.user);
    setToken(data.token);
    return { success: true, isAdmin: false };
  };

  const updateUserProfile = async (updateData) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.error(
        "No token available. User must be logged in to update profile."
      );
      throw new Error("You are not authenticated.");
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update user profile.");
      }
      setUser((prevUser) => ({
        ...prevUser,
        ...result.user,
      }));

      localStorage.setItem("userData", JSON.stringify(result.user));

      return result.user;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const updatePassword = async (passwordData) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      console.error(
        "No token available. User must be logged in to update password."
      );
      throw new Error("You are not authenticated.");
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update password.");
      }
      return result;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const adminLogin = async (email, password) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Admin login failed");
    }

    const data = await res.json();

    if (data.user && data.user.role === "ADMIN") {
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.user));
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");

      setIsAdmin(true);
      setUser(data.user);
      setToken(data.token);
      return { success: true, isAdmin: true };
    } else {
      throw new Error("You do not have permission to access the admin panel.");
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    token,
    isAdmin,
    loading,
    login,
    adminLogin,
    logout,
    signup,
    updateUserProfile,
    updatePassword,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
