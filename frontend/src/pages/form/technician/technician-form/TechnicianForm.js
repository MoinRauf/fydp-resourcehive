import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./components/ForgotPassword";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "./components/CustomIcons";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function TechnicianForm(props) {
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    governmentIdNumber: "",
    phoneNumber: "",
    requestedRole: "",
    residentialAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    hospitalDetails: {
      hospitalName: "",
      employeeId: "",
      position: "",
      idCardNumber: "",
      idCardIssueDate: "",
      idCardExpiryDate: "",
      hospitalContact: {
        phone: "",
        email: "",
      },
    },
    idCardImage: null,
    governmentIdImage: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle nested input change (e.g., residentialAddress)
  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "name",
      "email",
      "governmentIdNumber",
      "phoneNumber",
      "requestedRole",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field} is required`);
        return false;
      }
    }

    if (
      !formData.residentialAddress.street ||
      !formData.residentialAddress.city
    ) {
      toast.error("Residential address fields are required");
      return false;
    }

    if (
      !formData.hospitalDetails.hospitalName ||
      !formData.hospitalDetails.position
    ) {
      toast.error("Hospital details are required");
      return false;
    }

    return true;
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (
        typeof formData[key] === "object" &&
        key !== "idCardImage" &&
        key !== "governmentIdImage"
      ) {
        data.append(key, JSON.stringify(formData[key])); // Convert nested objects to JSON
      } else {
        data.append(key, formData[key]); // Append normal fields
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/complete-profile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile completed successfully!");
        navigate("/"); // Navigate to home page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
        <Card
          variant="outlined"
          sx={{
            width: "110%",
            minWidth: "fit-content",
            maxWidth: "none",
            display: "flex",
            flexDirection: "column",
            p: 5,
            maxHeight: "90vh", // Restrict height
            overflow: "auto", // Enable scrolling
          }}
        >
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Technician Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Stack direction="row" spacing={5}>
              {/* Name */}
              <FormControl>
                <FormLabel>Name</FormLabel>
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </FormControl>

              {/* Email */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </FormControl>

              {/* Government ID Number */}
              <FormControl>
                <FormLabel>Government ID Number</FormLabel>
                <TextField
                  name="governmentIdNumber"
                  value={formData.governmentIdNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={5}>
              {/* Phone Number */}
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <TextField
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </FormControl>

              {/* Role */}
              <FormControl>
                <FormLabel>Requested Role</FormLabel>
                <TextField
                  name="requestedRole"
                  value={formData.requestedRole}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </FormControl>
            </Stack>
            {/* Residential Address */}
            {/* Residential Address */}
            <Typography variant="h6">Residential Address</Typography>

            <Stack direction="row" spacing={5}>
              <FormControl fullWidth>
                <FormLabel>Street</FormLabel>
                <TextField
                  name="street"
                  onChange={(e) => handleNestedChange(e, "residentialAddress")}
                  required
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>City</FormLabel>
                <TextField
                  name="city"
                  onChange={(e) => handleNestedChange(e, "residentialAddress")}
                  required
                  fullWidth
                />
              </FormControl>
            </Stack>
            {/* Hospital Details */}
            <Typography variant="h6">Hospital Details</Typography>

            <Stack direction="row" spacing={5}>
              <FormControl fullWidth>
                <FormLabel>Hospital Name</FormLabel>
                <TextField
                  name="hospitalName"
                  onChange={(e) => handleNestedChange(e, "hospitalDetails")}
                  required
                  fullWidth
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Position</FormLabel>
                <TextField
                  name="position"
                  onChange={(e) => handleNestedChange(e, "hospitalDetails")}
                  required
                  fullWidth
                />
              </FormControl>
            </Stack>

            {/* Submit Button */}
            <Button type="submit" variant="contained" >
              Submit
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
