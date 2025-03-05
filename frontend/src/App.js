// src/App.jsx
import React from "react";
// import Navbar from "./components/Navbar"; // Import Navbar
// import Footer from "./components/Footer"; // Import Footer
import RouteComponent from "./routes/Routes";
import { Toaster } from "react-hot-toast"; // Import the Toaster component

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <RouteComponent />
      <Toaster /> {/* Add the Toaster component here */}
      {/* <Footer /> */}
      {/* checking */}
    </div>
  );
};

export default App;
