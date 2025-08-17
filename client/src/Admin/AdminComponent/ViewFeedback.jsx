import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ViewFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const getAllFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/api/feedback/getAllFeedbacks`);
      setFeedback(response.data.response || []);
    } catch (error) {
      setError('Failed to load feedback');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${VITE_API_BASE_URL}/api/feedback/deleteSingleFeedback/${id}`);
      setFeedback(feedback.filter((item) => item._id !== id));
      getAllFeedbacks();
    } catch (error) {
      setError('Failed to delete feedback');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          View Feedback
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography color="error" variant="body1" align="center" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        {!loading && feedback.length === 0 && !error && (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ my: 4 }}>
            No feedback available
          </Typography>
        )}

        {!loading && feedback.length > 0 && (
          <Stack spacing={3}>
            {feedback.map((item) => (
              <Card
                key={item._id}
                sx={{
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                  bgcolor: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Feedback
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {item.feedback}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>User Name:</strong> {item.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted:</strong>{' '}
                    {new Date(item.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Last Updated:</strong>{' '}
                    {new Date(item.updatedAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item?._id)}
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1,
                      '&:hover': { borderColor: 'error.dark' },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default ViewFeedback;