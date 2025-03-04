import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [data, setData] = useState({
    name: '',
    email: '',
    profileImage: '',
    createdAt: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile
  const userProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7000/api/user/getUserById', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setData(response.data.user || {});
      setError(null);
    } catch (err) {
      setError('Failed to fetch profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Update profile
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (selectedImage) formData.append('profileImage', selectedImage);

      await axios.put('http://localhost:7000/api/user/updateUser', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditMode(false);
      setSelectedImage(null);
      userProfile();
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete profile
  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete('http://localhost:7000/api/user/deleteUser', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setTimeout(() => navigate('/signup'), 1500);
    } catch (err) {
      setError('Failed to delete profile');
      console.error(err);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 2, sm: 4, md: 6 }, // Responsive padding
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          width: '100%',
          p: { xs: 2, sm: 3 }, // Responsive padding
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <CardContent>
          {loading && (
            <Box display="flex" justifyContent="center" mb={2}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Profile Image */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : data.profileImage || ''
              }
              alt="Profile"
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
              }}
            />
          </Box>

          {/* Profile Details or Edit Form */}
          {editMode ? (
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                name="profileImage"
                type="file"
                InputLabelProps={{ shrink: true }}
                label="Profile Image"
                onChange={handleImageChange}
                fullWidth
                inputProps={{ accept: 'image/*' }}
                disabled={loading}
              />
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={data.name}
                onChange={handleChange}
                disabled={loading}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={data.email}
                onChange={handleChange}
                disabled={loading}
              />
            </Box>
          ) : (
            <Box>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}
              >
                {data.name || 'N/A'}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                {data.email || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Joined:{' '}
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : 'N/A'}
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={loading}
                fullWidth={editMode && { xs: true, sm: false }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setEditMode(true)}
                disabled={loading}
                fullWidth={{ xs: true, sm: false }}
              >
                Edit Profile
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              disabled={loading}
              fullWidth={{ xs: true, sm: false }}
            >
              Logout
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={loading}
              sx={{ borderColor: 'error.main', color: 'error.main' }}
              fullWidth={{ xs: true, sm: false }}
            >
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="error">
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile;