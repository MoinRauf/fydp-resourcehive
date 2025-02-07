import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => navigate("/login")} style={buttonStyle}>
        Login
      </button>
      <button onClick={() => navigate("/signup")} style={buttonStyle}>
        Sign Up
      </button>
    </div>
  );
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default HomePage;
