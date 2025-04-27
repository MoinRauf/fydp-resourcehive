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
import Hospitals from "../pages/dashboard/Admin/Pages/Hospitals";
import Equipment from "../pages/dashboard/Admin/Pages/Equipment";
import HospitalRequests from "../pages/dashboard/Admin/Pages/HospitalRequests";
// import Hospitals from "../pages/dashboard/Admin/Pages/Hospitals";
// import Hospitals from "../pages/dashboard/Admin/pages/Hospitals";
import Logout from "../pages/dashboard/Admin/Pages/Logout";
import Dashboard from "../pages/dashboard/Admin/Pages/Dashboard";
import ManagerHospitalSelection from "../pages/roleshospitalselection/manager/manager-hospital-selection/ManagerHospitalSelection";
import TechnicianHospitalSelection from "../pages/roleshospitalselection/technician/technician-hospital-selection/TechnicianHospitalSelection";
import MDashboard from "../pages/dashboard/Manager/Pages/MDashboard";
import MEquipment from "../pages/dashboard/Manager/Pages/MEquipment";
import MHospitalRequests from "../pages/dashboard/Manager/Pages/MHospitalRequests";
import MLogout from "../pages/dashboard/Manager/Pages/MLogout";
import MHospitals from "../pages/dashboard/Manager/Pages/MHospitals";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/SignUp" element={<SignUpSide />} />
      <Route path="/SignIn" element={<SignInSide />} />
      {/* Roles Form Routes */}
      <Route path="/managerform" element={<ManagerForm />} />
      <Route path="/technicianform" element={<TechnicianForm />} />
      <Route path="/adminform" element={<AdminForm />}></Route>
      {/* Roles Hospital Selection Routes */}
      <Route
        path="/hospitals/manager"
        element={<ManagerHospitalSelection />}
      ></Route>
      <Route
        path="/hospitals/technician"
        element={<TechnicianHospitalSelection />}
      ></Route>

      {/* Admin Dash Routes */}
      <Route path="/adminDashboard" element={<Dashboard />} />
      <Route path="/Equipment" element={<Equipment />} />
      <Route path="/HospitalRequests" element={<HospitalRequests />} />
      <Route path="/Hospitals" element={<Hospitals />} />
      <Route path="/Logout" element={<Logout />} />
      {/* manager */}
      <Route path="/managerDashboard" element={<MDashboard />} />
      <Route path="/MEquipment" element={<MEquipment />} />
      <Route path="/MHospitalRequests" element={<MHospitalRequests />} />
      <Route path="/MHospitals" element={<MHospitals />} />
      <Route path="/MLogout" element={<MLogout />} />
      {/* tech */}
      {/* <Route path="/technicianDashboard" element={<TDash />} /> */}
    </Routes>
  );
};

export default RouteComponent;
