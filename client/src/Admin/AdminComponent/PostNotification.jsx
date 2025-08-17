import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PostNotification() {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // Form validation state
  const [validation, setValidation] = useState({
    title: true,
    message: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
    if (error || success) {
      setError('');
      setSuccess('');
    }
    setValidation({ ...validation, [name]: true });
  };

  const fetchNotification = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${VITE_API_BASE_URL}/api/notification/getByIdNotification/${id}`
      );
      const data = response.data?.response || {};
      setNotification({
        title: data.title || '',
        message: data.message || '',
      });
    } catch (error) {
      setError('Failed to load notification data');
      console.error('Error fetching notification:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newValidation = {
      title: notification.title.trim() !== '',
      message: notification.message.trim() !== '',
    };
    setValidation(newValidation);
    return Object.values(newValidation).every((isValid) => isValid);
  };

  const updateNotification = async () => {
    if (!validateForm()) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `${VITE_API_BASE_URL}/api/notification/updateNotification/${id}`,
        notification
      );
      setSuccess('Notification updated successfully');
      setTimeout(() => navigate('/admin/manageNotification'), 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update notification';
      setError(errorMsg);
      console.error('Error updating notification:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async () => {
    if (!validateForm()) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${VITE_API_BASE_URL}/api/notification/postNotification`, notification);
      setSuccess('Notification published successfully');
      setNotification({ title: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create notification';
      setError(errorMsg);
      console.error('Error creating notification:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateNotification();
    } else {
      createNotification();
    }
  };

  useEffect(() => {
    if (id) fetchNotification();
  }, [id]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: { xs: 4, sm: 6, md: 8 }, // Responsive padding
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh', // Full height for centering
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px', // Limit max width for larger screens
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'primary.main',
            mb: { xs: 2, sm: 4 }, // Responsive margin
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }, // Responsive font size
          }}
        >
          {id ? 'Edit Notification' : 'Create New Notification'}
        </Typography>

        {/* Manage Notifications Button */}
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/manageNotification')}
          sx={{
            position: { xs: 'static', sm: 'absolute' }, // Static on mobile, absolute on desktop
            top: { sm: 0 },
            right: { sm: 0, md: -150 }, // Adjust right positioning
            mb: { xs: 2, sm: 0 }, // Margin bottom on mobile
            textTransform: 'none',
            borderRadius: 1,
            fontWeight: 500,
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
          }}
        >
          Manage Notifications
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            bgcolor: 'background.paper',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={{ xs: 2, sm: 3 }}>
              <TextField
                label="Notification Title"
                name="title"
                variant="outlined"
                value={notification.title}
                onChange={handleChange}
                required
                fullWidth
                disabled={loading}
                error={!validation.title}
                helperText={!validation.title ? 'Title is required' : ''}
                InputProps={{ sx: { borderRadius: 1 } }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive input font size
                  },
                }}
              />

              <TextField
                label="Message"
                name="message"
                variant="outlined"
                value={notification.message}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                disabled={loading}
                error={!validation.message}
                helperText={!validation.message ? 'Message is required' : ''}
                InputProps={{ sx: { borderRadius: 1 } }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive input font size
                  },
                }}
              />

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Stack
                direction={{ xs: 'column', sm: 'row' }} // Stack buttons vertically on mobile
                spacing={{ xs: 1, sm: 2 }}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/manageNotification')}
                  disabled={loading}
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
                    px: { xs: 2, sm: 3 }, // Responsive padding
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1,
                    borderRadius: 1,
                    textTransform: 'none',
                    minWidth: { xs: '100%', sm: 120 }, // Full width on mobile
                    fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
                    px: { xs: 2, sm: 3 }, // Responsive padding
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : id ? (
                    'Update Notification'
                  ) : (
                    'Publish Notification'
                  )}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default PostNotification;