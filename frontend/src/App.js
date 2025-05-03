// src/App.jsx
import React, { useEffect } from "react";
import RouteComponent from "./routes/Routes";
import { Toaster } from "react-hot-toast";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.info = () => {};
  console.debug = () => {};
  console.trace = () => {};
}

// console.log = () => {};

const App = () => {
  useEffect(() => {
    localStorage.setItem("mui-color-scheme-dark", "dark");
    localStorage.setItem("mui-color-scheme-light", "light");
    localStorage.setItem("mui-mode", "system");
  }, []);
  return (
    <div>
      <RouteComponent />
      <Toaster />
    </div>
  );
};

export default App;
