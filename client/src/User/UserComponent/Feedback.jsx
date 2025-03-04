import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFeedback(e.target.value);
    if (alert.open) setAlert({ ...alert, open: false });
  };

  const handlePost = async () => {
    if (!feedback.trim()) {
      setAlert({ open: true, message: 'Feedback cannot be empty', severity: 'error' });
      return;
    }

    setLoading(true);
    setAlert({ open: false, message: '', severity: 'success' });

    try {
      const response = await axios.post(
        'http://localhost:7000/api/feedback/postFeedback',
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFeedback('');
      setAlert({ open: true, message: 'Feedback submitted successfully!', severity: 'success' });
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Failed to submit feedback',
        severity: 'error',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'white',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}
            >
              Give Your Feedback
            </Typography>

            <Divider />

            <TextField
              name="feedback"
              label="Your Feedback"
              variant="outlined"
              value={feedback}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              disabled={loading}
              placeholder="Share your thoughts here..."
              sx={{ bgcolor: 'white' }}
              InputProps={{ sx: { borderRadius: 1 } }}
            />

            {alert.open && (
              <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
                {alert.message}
              </Alert>
            )}

            <Button
              variant="contained"
              onClick={handlePost}
              disabled={loading}
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 1,
                textTransform: 'none',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Feedback'}
            </Button>
          </Stack>
        </Paper>
        <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'medium', color: 'text.primary', mb: 1 }}
              >
                Why Your Feedback Matters
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Feedback is a cornerstone of growth and improvement, acting as a mirror that
                reflects our strengths and areas needing enhancement. It provides critical
                insights into how our actions, products, or services are perceived, allowing us
                to align more closely with your needs and expectations. By offering an external
                perspective, feedback reveals blind spots we might overlook, fostering
                self-awareness and informed decision-making. It drives innovation by highlighting
                what works well and what doesn’t, encouraging us to adapt, refine, and evolve.
                Additionally, feedback builds trust and engagement—when you see your input valued
                and acted upon, it strengthens our relationship. It also serves as a learning
                tool, enabling continuous development through constructive criticism and praise
                alike. Ultimately, your feedback empowers us to bridge gaps, enhance quality, and
                create more meaningful experiences for you and our community.
              </Typography>
            </Box>
      </Container>
    </Box>
  );
}

export default Feedback;