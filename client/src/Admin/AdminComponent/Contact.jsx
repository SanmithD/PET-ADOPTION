import { ArrowBack, Delete, Send } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const ReplyItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  width: '100%',
}));

const Contact = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState('');
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedMessage) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to reply');
      }

      const response = await axios.post(
        `${VITE_API_BASE_URL}/contact/messages/${selectedMessage._id}/replies`,
        { message: reply },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSelectedMessage(response.data.data);
      setReply('');
    } catch (err) {
      setError('Failed to send reply: ' + (err.response?.data?.message || err.message));
      console.error('Reply error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${VITE_API_BASE_URL}/api/contact/deleteMsg/${id}`);
      await getAllMessages();
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (err) {
      setError('Failed to delete message: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReply = async (messageId, replyId) => {
    try {
      setLoading(true);
      await axios.delete(`${VITE_API_BASE_URL}/contact/messages/${messageId}/replies/${replyId}`);
      await getSingleMessage(messageId);
    } catch (err) {
      setError('Failed to delete reply: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
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

  const renderMessageList = () => {
    if (allMessages.length === 0) {
      return (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 4 }}>
          No messages found
        </Typography>
      );
    }

    // Group messages by userId and only show the first message per user in the stack
    const uniqueUsers = [];
    const messagesByUser = allMessages.reduce((acc, message) => {
      const userId = message.userMsg[0]?.userId;
      if (!uniqueUsers.includes(userId)) {
        uniqueUsers.push(userId);
        acc.push(message);
      }
      return acc;
    }, []);

    return (
      <Stack spacing={2}>
        {messagesByUser.map((message) => (
          <StyledPaper
            key={message._id}
            elevation={2}
            onClick={() => getSingleMessage(message._id)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {message.userMsg[0]?.name?.charAt(0) || '?'}
                </Avatar>
                <Box>
                  <Typography variant="h6">{message.userMsg[0]?.name || 'Unknown User'}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(message.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Button
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(message._id);
                }}
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {message.userMsg[0]?.message || 'No message content'}
            </Typography>
            {message.userMsg[0]?.replies?.length > 0 && (
              <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                {message.userMsg[0].replies.length} {message.userMsg[0].replies.length === 1 ? 'reply' : 'replies'}
              </Typography>
            )}
          </StyledPaper>
        ))}
      </Stack>
    );
  };

  const renderMessageDetail = () => {
    if (!selectedMessage) return null;
    const message = selectedMessage.userMsg[0];

    // Filter all messages with the same userId as the selected message
    const userMessages = allMessages.filter(
      (msg) => msg.userMsg[0]?.userId === message?.userId
    );

    return (
      <Box>
        <Button startIcon={<ArrowBack />} onClick={() => setSelectedMessage(null)} sx={{ mb: 2 }}>
          Back to messages
        </Button>
        <StyledPaper elevation={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {message?.name?.charAt(0) || '?'}
            </Avatar>
            <Box>
              <Typography variant="h6">{message?.name || 'Unknown User'}</Typography>
            </Box>
          </Box>

          {/* Display all messages from this user */}
          <List sx={{ mb: 3 }}>
            {userMessages.map((msg) => (
              <Box key={msg._id} sx={{ mb: 2 }}>
                {msg.userMsg[0]?.contactImage && (
                  <Box my={2}>
                    <img
                      src={msg.userMsg[0].contactImage}
                      alt="Attached"
                      style={{ maxWidth: '100%', borderRadius: '4px' }}
                    />
                  </Box>
                )}
                <Typography variant="body1" paragraph>
                  {msg.userMsg[0]?.message || 'No message content'}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {formatDate(msg.createdAt)}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </List>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Replies
          </Typography>
          {message?.replies?.length > 0 ? (
            <List>
              {message.replies.map((replyItem) => (
                <ReplyItem key={replyItem._id} elevation={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'secondary.main', width: 32, height: 32 }}>
                        {replyItem.name?.charAt(0) || '?'}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">{replyItem.name || 'Unknown User'}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(replyItem.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteReply(selectedMessage._id, replyItem._id)}
                    >
                      <Delete fontSize="small" />
                    </Button>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1, pl: 5 }}>
                    {replyItem.message}
                  </Typography>
                  {replyItem.replyImage && (
                    <Box mt={1} pl={5}>
                      <img
                        src={replyItem.replyImage}
                        alt="Reply"
                        style={{ maxWidth: '150px', borderRadius: '4px' }}
                      />
                    </Box>
                  )}
                </ReplyItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              No replies yet
            </Typography>
          )}

          <Box component="form" onSubmit={handleReply} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Write a reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              multiline
              rows={3}
              margin="normal"
              disabled={loading}
              placeholder="Type your reply here..."
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !reply.trim()}
                startIcon={<Send />}
              >
                {loading ? 'Sending...' : 'Send Reply'}
              </Button>
            </Box>
          </Box>
        </StyledPaper>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Contact Messages
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : selectedMessage ? renderMessageDetail() : renderMessageList()}
    </Container>
  );
};

export default Contact;