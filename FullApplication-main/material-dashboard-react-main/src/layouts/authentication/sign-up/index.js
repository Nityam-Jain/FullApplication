import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    dos: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, mobile, dos, remember } = formData;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const mobilePattern = /^\d{10}$/;
    const today = new Date().toISOString().split("T")[0];

    if (firstName.length < 2 || firstName.length > 10)
      return alert("First name must be between 2 and 10 characters.");
    if (lastName.length < 2 || lastName.length > 10)
      return alert("Last name must be between 2 and 10 characters.");
    if (!emailPattern.test(email))
      return alert("Email must be a valid Gmail address (e.g., name@gmail.com).");
    if (password.length < 8) return alert("Password must be at least 8 characters.");
    if (!mobilePattern.test(mobile)) return alert("Mobile number must be 10 digits.");
    if (!dos || dos > today) return alert("Date must be today or a past date.");
    if (!remember) return alert("Please check 'Remember me' before submitting.");

    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        firstName,
        lastName,
        email,
        password,
        mobile,
        dos,
        remember,
      });

      alert("Signup successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        dos: "",
        remember: false,
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Try again.");
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)",
      }}
    >
      <Card sx={{ width: 400, p: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Sign up
          </Typography>

          <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            <Grid item>
              <FacebookIcon sx={{ cursor: "pointer" }} />
            </Grid>
            <Grid item>
              <GitHubIcon sx={{ cursor: "pointer" }} />
            </Grid>
            <Grid item>
              <GoogleIcon sx={{ cursor: "pointer" }} />
            </Grid>
          </Grid>

          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(true);
                        setTimeout(() => {
                          setShowPassword(false);
                        }, 1000); // 👁️ Show password for 1 second
                      }}
                      edge="end"
                    >
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              type="tel"
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 10 }}
              value={formData.mobile}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, ""); // Allow only digits
                setFormData({ ...formData, mobile: onlyNums });
              }}
            />

            <TextField
              label="Date"
              name="dos"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: today }}
              value={formData.dos}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox checked={formData.remember} onChange={handleChange} name="remember" />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#2980b9",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#2980b9",
                },
              }}
            >
              SIGN UP
            </Button>
          </form>

          <Typography variant="body2" align="center" mt={2}>
            Already have an account?{" "}
            <Link
              to="/authentication/sign-in"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Signup;
