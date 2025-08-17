import { Delete } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

// const ReplyItem = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginTop: theme.spacing(1),
//   marginBottom: theme.spacing(1),
//   backgroundColor: theme.palette.grey[50],
//   width: '100%',
// }));

const Contact = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [reply, setReply] = useState('');
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${VITE_API_BASE_URL}/contact/getAllMsg`);
        setAllMessages(response.data.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAllMessages();
  }, [VITE_API_BASE_URL]);

  const getSingleMessage = async (messageId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${VITE_API_BASE_URL}/contact/messages/${messageId}/replies`);
      setSelectedMessage(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch message details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleReply = async (e) => {
  //   e.preventDefault();
  //   if (!reply.trim() || !selectedMessage) return;
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem('token');
  //     if (!token) throw new Error('You must be logged in to reply');
  //     const response = await axios.post(
  //       `${VITE_API_BASE_URL}/contact/messages/${selectedMessage._id}/replies`,
  //       { message: reply },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     setSelectedMessage(response.data.data);
  //     setReply('');
  //   } catch (err) {
  //     setError('Failed to send reply');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${VITE_API_BASE_URL}/contact/deleteMsg/${id}`);
      setAllMessages(allMessages.filter((msg) => msg._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (err) {
      setError('Failed to delete message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Contact Messages</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <Stack spacing={2}>
          {allMessages.map((message) => (
            <StyledPaper key={message._id} onClick={() => getSingleMessage(message._id)}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Avatar>{message.userMsg[0]?.name?.charAt(0) || '?'}</Avatar>
                  <Typography variant="h6">{message.userMsg[0]?.name || 'Unknown'}</Typography>
                </Box>
                <Button color="error" onClick={(e) => { e.stopPropagation(); handleDelete(message._id); }}>
                  <Delete />
                </Button>
              </Box>
              <Typography>{message.userMsg[0]?.message || 'No content'}</Typography>
            </StyledPaper>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Contact;
