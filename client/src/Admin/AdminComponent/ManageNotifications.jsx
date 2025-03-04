import { Delete, Edit, PostAddOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageNotifications() {
  const [allNotification, setAllNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getAllNoti = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_API_BASE_URL}/notification/getAllNotification`);
      setAllNotification(response.data.response || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${VITE_API_BASE_URL}/notification/deleteByIdNotification/${id}`);
      getAllNoti();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${VITE_API_BASE_URL}/notification/deleteAllNotification`);
      getAllNoti();
    } catch (error) {
      console.log(error);
    }
  };

  const sortedNotifications = [...allNotification].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    getAllNoti();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 4, md: 6 }, // Responsive padding
        minHeight: '100vh', // Ensure full height
      }}
    >
      <Box>
        {/* Header */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: { xs: 2, sm: 4 }, // Responsive margin
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }, // Responsive font size
            textAlign: { xs: 'center', sm: 'left' }, // Center on mobile
          }}
        >
          Manage Notifications
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }} // Stack on mobile, row on desktop
          spacing={{ xs: 1, sm: 2 }} // Responsive spacing
          sx={{
            mb: { xs: 2, sm: 4 }, // Margin bottom
            justifyContent: { xs: 'center', sm: 'flex-end' }, // Center on mobile
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/admin/postNotification')}
            startIcon={<PostAddOutlined />}
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
              px: { xs: 2, sm: 3 }, // Responsive padding
              py: 1,
              textTransform: 'none',
              minWidth: { xs: '100%', sm: 'auto' }, // Full width on mobile
            }}
          >
            Add Notification
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAll}
            startIcon={<Delete />}
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
              px: { xs: 2, sm: 3 }, // Responsive padding
              py: 1,
              textTransform: 'none',
              minWidth: { xs: '100%', sm: 'auto' }, // Full width on mobile
            }}
          >
            Delete All
          </Button>
        </Stack>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={{ xs: 4, sm: 5 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Notifications List */}
        {!loading && (
          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: 'hidden', 
            }}
          >
            <List sx={{ width: '100%' }}>
              {sortedNotifications.map((notification) => (
                <ListItem
                  key={notification._id}
                  divider
                  sx={{
                    py: { xs: 1.5, sm: 2 }, 
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transition: '0.3s',
                    },
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    alignItems: { xs: 'flex-start', sm: 'center' },
                  }}
                >
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <Box component="div">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            mb: 0.5,
                          }}
                        >
                          {notification.message.length < 50 ? notification.message.substring(0, 50) + "..." : notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          sx={{
                            fontSize: { xs: '0.625rem', sm: '0.75rem' }, 
                          }}
                        >
                          Created: {new Date(notification.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                    primaryTypographyProps={{
                      variant: 'h6',
                      sx: {
                        fontSize: { xs: '1rem', sm: '1.25rem' }, 
                      },
                    }}
                    sx={{ mb: { xs: 1, sm: 0 } }} 
                  />
                  <ListItemSecondaryAction
                    sx={{
                      position: { xs: 'static', sm: 'absolute' }, 
                      right: { sm: 16 },
                      mt: { xs: 0, sm: 0 }, 
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={{ xs: 1, sm: 2 }} 
                    >
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => navigate(`/admin/postNotification/${notification?._id}`)}
                        color="primary"
                        sx={{ p: { xs: 0.5, sm: 1 } }} 
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(notification._id)}
                        color="error"
                        sx={{ p: { xs: 0.5, sm: 1 } }} 
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Empty State */}
        {sortedNotifications.length === 0 && !loading && (
          <Typography
            variant="h6"
            textAlign="center"
            mt={{ xs: 2, sm: 4 }}
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' }, 
            }}
          >
            No notifications found
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default ManageNotifications;