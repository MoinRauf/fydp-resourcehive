// src/Route.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

// Import Page Components
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import SignInSide from "../pages/user-signin/sign-in-side/SignInSide";
import SignUpSide from "../pages/user-signup/sign-up-side/SignUpSide";
import AdminForm from "../pages/form/admin/admin-form/AdminForm";
import ManagerForm from "../pages/form/manager/manager-form/ManagerForm";
import TechnicianForm from "../pages/form/technician/technician-form/TechnicianForm";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/SignUp" element={<SignUpSide />} />
      <Route path="/SignIn" element={<SignInSide />} />
      <Route path="/managerform" element={<ManagerForm />} />
      <Route path="/technicianform" element={<TechnicianForm />} />
      <Route path="/adminform" element={<AdminForm />}></Route>
    </Routes>
  );
};

export default RouteComponent;
