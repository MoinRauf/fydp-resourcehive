import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import ForgotPassword from "./ForgotPassword";
import axios from "axios"; // Import Axios
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { CssBaseline } from "@mui/material";
import AppTheme from "../../shared-theme/AppTheme"; // Ensure AppTheme is imported

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get input values
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Reset errors
    setEmailError(false);
    setPasswordError(false);
    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    toast.dismiss();
    // Validate inputs
    if (!email || !password) {
      toast.error("All fields are required", { duration: 1500 });
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    // Make the API request using Axios
    try {
      const response = await axios.post(
        "https://resourcehive-backend.vercel.app/api/v1/users/login",
        {
          email,
          password,
        }
      );

      // Check if login is successful
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        toast.success("Login successful", { duration: 1500 });

        setTimeout(() => {
          navigate("/"); // Navigate to home page after 3 seconds
        }, 2000);
      } else {
        toast.error("Invalid email or password", { duration: 1500 });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        duration: 1500,
      });
    }
  };

  return (
    <AppTheme> {/* Ensure AppTheme wraps the entire content */}
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center", display: "inline" }}>
            Don&apos;t have an account?{" "}
            <Button
              onClick={() => navigate("/signup")} // Navigate to sign up page
              variant="body2"
              sx={{ padding: 0, textTransform: "none" }} // Remove padding and text transform for a tighter layout
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Card>
    </AppTheme>
  );
}
