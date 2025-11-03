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

    const responseData = await res.json();
    const { token, user } = responseData.data; // <-- Fix 1: Handle nested data

    // Fix 2: Use the correct keys for localStorage
    localStorage.setItem("userToken", token);
    localStorage.setItem("userData", JSON.stringify(user));

    setUser(user);
    setToken(token); // Also set the token in the state

    return responseData;
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

    const responseData = await res.json();
    const { token, user } = responseData.data; // <-- The main fix is here

    localStorage.setItem("userToken", token);

    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.removeItem("adminToken"); // Clear any admin session
    localStorage.removeItem("adminData");

    setIsAdmin(false);
    setUser(user);
    setToken(token);
    console.log(user, "THis is user");
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
        `${process.env.REACT_APP_API_URL}/users/update-profile`,
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
      const updatedUser = result.data;
      if (updatedUser) {
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
        }));
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        return updatedUser;
      } else {
        console.warn("API did not return the updated user data as expected.");
        return result;
      }
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
        `${process.env.REACT_APP_API_URL}/users/update-password`,
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

    const responseData = await res.json();
    const { user, token } = responseData.data;

    if (user && user.role === "ADMIN") {
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(user));
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");

      setIsAdmin(true);
      setUser(user);
      setToken(token);
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

  const isLoggedIn = !!user;

  const value = {
    user,
    token,
    isAdmin,
    isLoggedIn,
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
