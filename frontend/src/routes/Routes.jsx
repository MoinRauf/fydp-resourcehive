// src/Route.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

// Import Page Components
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import SignInSide from "../pages/user-signin/sign-in-side/SignInSide";
import SignUpSide from "../pages/user-signup/sign-up-side/SignUpSide";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      < Route path="/SignUp" element={<SignUpSide />} />
     < Route path="/SignIn" element={<SignInSide />} />
     
    </Routes>
  );
};

export default RouteComponent;
