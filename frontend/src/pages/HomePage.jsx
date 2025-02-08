import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import "../pages/css/homepage/HomePage.css"; // Import the CSS file
import TypingText from "../components/TypingText";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="homepage-container"
      style={{
        backgroundImage: `url("/RH-IMAGE.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <Navbar /> */}

      {/* Typing text section */}
      {/* <TypingText />
       */}
      <div className="typing-text-container">
        <TypingText />
      </div>

      {/* Login & Signup Buttons */}
      <div className="homepage-buttons">
        <button onClick={() => navigate("/signin")} className="button-style">
          Sign In
        </button>
        <button onClick={() => navigate("/signup")} className="button-style">
          Sign Up
        </button>
      </div>

      {/* <Footer />s */}
    </div>
  );
};

export default HomePage;
