// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
import RouteComponent from "./routes/Routes";


const App = () => {
  return (
    <div>
      <Navbar />
      <RouteComponent />
      <Footer />
    </div>
  );
};

export default App;
