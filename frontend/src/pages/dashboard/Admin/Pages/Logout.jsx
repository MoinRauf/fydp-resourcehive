import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token does not exist!");
      navigate("/AdminDashboard"); // Stay on AdminDashboard
      return;
    }

    localStorage.removeItem("token"); // Remove token
    alert("Successfully logged out!");
    navigate("/"); // Redirect to home

  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
