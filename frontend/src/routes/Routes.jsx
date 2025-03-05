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
import Hospitals from "../pages/dashboard/Admin/Pages/Hospitals"
import Equipment from "../pages/dashboard/Admin/Pages/Equipment";
import HospitalRequests from "../pages/dashboard/Admin/Pages/HospitalRequests";
// import Hospitals from "../pages/dashboard/Admin/Pages/Hospitals";
// import Hospitals from "../pages/dashboard/Admin/pages/Hospitals";
import Logout from "../pages/dashboard/Admin/Pages/Logout";
import Dashboard from "../pages/dashboard/Admin/Pages/Dashboard";

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
      {/* Admin Dash Routes */}
      <Route path="/adminDashboard" element={<Dashboard />} />
      <Route path="/Equipment" element={<Equipment />} />
      <Route path="/HospitalRequests" element={<HospitalRequests />} />
      <Route path="/Hospitals" element={<Hospitals />} />
      <Route path="/Logout" element={<Logout />} />
    </Routes>
  );
};

export default RouteComponent;
