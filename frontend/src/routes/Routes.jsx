// src/Route.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

// Import Page Components
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
// import SignUp from "../pages/user-signup/sign-up/SignUp";
// import SignIn from "../pages/user-signin/sign-in/SignIn";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* < Route path="/SignUp" element={<SignUp />} />
     < Route path="/SignIn" element={<SignIn />} />
      */}
    </Routes>
  );
};

export default RouteComponent;
