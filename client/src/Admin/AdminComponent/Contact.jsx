import {
  Delete as DeleteIcon,
  Message as MessageIcon,
  Send as SendIcon
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ContactPage = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reply, setReply] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_PORT}/api/contact/getAllMsg`);
        const messages = response.data.data || [];
        
        // Group messages by user and get the latest message for each user
        const latestMessagesByUser = messages.reduce((acc, message) => {
          const userId = message.userMsg?.[0]?.userId;
          if (!acc[userId] || new Date(message.createdAt) > new Date(acc[userId].createdAt)) {
            acc[userId] = message;
          }
          return acc;
        }, {});

        setAllMessages(Object.values(latestMessagesByUser));
        setError(null);
      } catch (err) {
        setError('Failed to fetch messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAllMessages();
  }, []);

  const getUserMessages = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_PORT}/api/contact/getAllMsg`);
      const messages = response.data.data || [];
      
      // Filter messages by userId
      const userSpecificMessages = messages.filter(
        message => message.userMsg?.[0]?.userId === userId
      );

      // Sort messages by creation date
      const sortedMessages = userSpecificMessages.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setSelectedUser(userId);
      setUserMessages(sortedMessages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e, messageId) => {
    e.preventDefault();
    if (!reply.trim()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to reply');
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/contact/messages/${messageId}/replies`,
        { message: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update user messages after replying
      const updatedMessages = userMessages.map(msg => 
        msg._id === messageId ? response.data.data : msg
      );
      setUserMessages(updatedMessages);
      setReply('');
    } catch (err) {
      setError('Failed to send reply');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_PORT}/api/contact/deleteMsg/${id}`);
      
      // Remove deleted message from both overall and user-specific messages
      setAllMessages((prevMessages) => 
        prevMessages.filter((msg) => msg._id !== id)
      );
      setUserMessages((prevMessages) => 
        prevMessages.filter((msg) => msg._id !== id)
      );
      
      setDeleteConfirmOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to delete message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteMessage = (message) => {
    setMessageToDelete(message);
    setDeleteConfirmOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Messages List */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ height: '100%', overflow: 'auto', maxHeight: '70vh' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                p: 2, 
                backgroundColor: 'primary.main', 
                color: 'white', 
                textAlign: 'center' 
              }}
            >
              Contact Messages
            </Typography>

            {error && (
              <Alert severity="error" sx={{ m: 2 }}>
                {error}
              </Alert>
            )}

            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {allMessages.map((message) => (
                  <ListItem 
                    key={message._id} 
                    divider
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        color="error" 
                        onClick={() => confirmDeleteMessage(message)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    onClick={() => getUserMessages(message.userMsg?.[0]?.userId)}
                    sx={{ 
                      cursor: 'pointer', 
                      backgroundColor: selectedUser === message.userMsg?.[0]?.userId 
                        ? 'action.selected' 
                        : 'inherit',
                      '&:hover': { 
                        backgroundColor: 'action.hover' 
                      } 
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {message?.userMsg?.[0]?.name?.charAt(0) || '?'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message?.userMsg?.[0]?.name || 'Unknown'}
                      secondary={message?.userMsg?.[0]?.message?.substring(0, 50) + '...' || 'No content'}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Message Details and Replies */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            {userMessages.length > 0 ? (
              <>
                <Typography variant="h5" gutterBottom>
                  <MessageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Messages from {userMessages[0].userMsg?.[0]?.name || 'Unknown'}
                </Typography>

                {userMessages.map((message, index) => (
                  <Box key={message._id} sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {message.userMsg?.[0]?.message || 'No content'}
                    </Typography>
                    
                    {message.userMsg?.[0]?.contactImage && (
                      <Box sx={{ height: '200px', width: '300px', mb: 2 }}> 
                        <img 
                          src={message.userMsg?.[0]?.contactImage} 
                          alt='contact' 
                          style={{ height: 200, width: 300 }} 
                        />
                      </Box>
                    )}

                    {/* Replies Section */}
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                      Replies
                    </Typography>
                    {message.replies?.length > 0 ? (
                      <List>
                        {message.replies.map((reply, replyIndex) => (
                          <ListItem 
                            key={replyIndex} 
                            divider
                            sx={{ 
                              backgroundColor: 'grey.100',
                              borderRadius: 1 
                            }}
                          >
                            <ListItemText primary={reply.message} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No replies yet.
                      </Typography>
                    )}

                    {/* Reply Input */}
                    <Box 
                      component="form" 
                      onSubmit={(e) => handleReply(e, message._id)} 
                      sx={{ mt: 3 }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Write a reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        disabled={!reply.trim()}
                      >
                        Send Reply
                      </Button>
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
              >
                <Typography variant="h6" color="text.secondary">
                  Select a message to view details
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this message from {messageToDelete?.userMsg?.[0]?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(messageToDelete._id)} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactPage;