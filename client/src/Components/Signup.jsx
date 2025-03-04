import { Alert, Button, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
        setFormData({ ...formData, profileImage: e.target.files[0] })
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newForm = new FormData();
    newForm.append('profileImage', formData.profileImage);
    newForm.append('name', formData.name);
    newForm.append('email', formData.email);
    newForm.append('password', formData.password);

    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${VITE_API_BASE_URL}/user/signup`,
        newForm, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }
      );
      setTimeout(()=>{
        navigate('/login');
      },2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', mt: 4 }}>
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              name="profileImage"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              fullWidth
              inputProps={{ accept: "image/*" }}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              value={formData.name}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={formData.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              onChange={handleChange}
              value={formData.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Signup;