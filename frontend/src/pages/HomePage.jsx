import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pages/css/homepage/HomePage.css";  // Import the CSS file
import TypingText from "../components/TypingText";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <Navbar />
      
      {/* Typing text section */}
      <TypingText />

      {/* Login & Signup Buttons */}
      <div className="homepage-buttons">
        <button onClick={() => navigate("/signin")} className="button-style">
          Login
        </button>
        <button onClick={() => navigate("/signup")} className="button-style">
          Sign Up
        </button>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
