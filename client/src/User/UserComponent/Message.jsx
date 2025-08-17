import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 2,
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const MessageItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
}));

const ReplyItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(4),
  backgroundColor: theme.palette.grey[100],
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

function Message() {
  const [contactForm, setContactForm] = useState({
    message: '',
    contactImage: null,
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'contactImage') {
      setContactForm({ ...contactForm, contactImage: files[0] || null });
    } else {
      setContactForm({ ...contactForm, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!contactForm.message.trim()) {
      setError('Message is required');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('message', contactForm.message);
    if (contactForm.contactImage) {
      formData.append('contactImage', contactForm.contactImage);
    }

    try {
      await axios.post(
        `${VITE_API_BASE_URL}/contact/postMessage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess(true);
      setContactForm({ message: '', contactImage: null });
      await fetchMessages();
    } catch (err) {
      setError('Failed to send message: ' + (err.response?.data?.message || err.message));
      console.error('Error posting message:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_API_BASE_URL}/contact/getOwnMsg`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data)
      setMessages(response.data.response || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Contact Form */}
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          We’d love to hear from you! Send us a message below.
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Message sent successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            value={contactForm.message}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 3 }}
            disabled={loading}
            required
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel shrink sx={{ top: '-6px', left: '-12px' }}>
              Attach Image (Optional)
            </InputLabel>
            <TextField
              type="file"
              name="contactImage"
              onChange={handleChange}
              variant="outlined"
              inputProps={{ accept: 'image/*' }}
              disabled={loading}
            />
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !contactForm.message.trim()}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 2px 10px rgba(25, 118, 210, 0.3)',
              '&:hover': { boxShadow: '0 4px 15px rgba(25, 118, 210, 0.5)' },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
          </Button>
        </Box>
      </StyledPaper>

      {/* Messages List with Replies */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Your Messages
        </Typography>
        {loading && !messages.length ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : messages.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No messages yet
          </Typography>
        ) : (
          <Stack spacing={2}>
            {messages.map((msg) => (
              <MessageItem key={msg._id} elevation={1}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {msg.userMsg[0]?.message || 'No message content'}
                </Typography>
                {msg.userMsg[0]?.contactImage && (
                  <Box my={2}>
                    <img
                      src={msg.userMsg[0].contactImage}
                      alt="Attached"
                      style={{ maxWidth: '100%', borderRadius: '4px' }}
                    />
                  </Box>
                )}
                <Typography variant="caption" color="text.secondary">
                  Sent by: {msg.userMsg[0]?.name || 'Unknown User'} - {formatDate(msg.createdAt)}
                </Typography>

                {/* Display Replies */}
                {msg.userMsg[0]?.replies?.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Replies:
                    </Typography>
                    <Stack spacing={1}>
                      {msg.userMsg[0].replies.map((reply) => (
                        <ReplyItem key={reply._id} elevation={1}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {reply.message}
                          </Typography>
                          {reply.replyImage && (
                            <Box my={1}>
                              <img
                                src={reply.replyImage}
                                alt="Reply Image"
                                style={{ maxWidth: '150px', borderRadius: '4px' }}
                              />
                            </Box>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            Admin Reply by: {reply.name || 'Admin'} - {formatDate(reply.createdAt)}
                          </Typography>
                        </ReplyItem>
                      ))}
                    </Stack>
                  </Box>
                )}
              </MessageItem>
            ))}
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default Message;