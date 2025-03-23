import { Alert, Button, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
  
    try {
      const response = await axios.put(
        `https://pet-adoption-yc64.onrender.com/api/user/resetPass`,
        formData,
      );
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || "Login failed.");
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
            Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

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
              label="New Password"
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
              Reset
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ResetPassword;