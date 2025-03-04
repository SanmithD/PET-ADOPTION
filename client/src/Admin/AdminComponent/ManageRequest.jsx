import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ManageRequest() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(false);
  const [rejected, setRejected] = useState(false);

  const allAdoptionRequest = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/adoption/getAllRequest');
      setRequests(response.data.response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = (id) => {
    console.log(`Accepted request: ${id}`);
    setStatus(true);
    setRejected(true);
  };

  const handleReject = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/adoption/rejectRequest/${id}`);
      allAdoptionRequest();
    } catch (error) {
      console.log(error);
    }
    console.log(`Rejected request: ${id}`);
  };

  useEffect(() => {
    allAdoptionRequest();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Adoption Requests
      </Typography>
      
      <Stack spacing={3}>
        {requests.map((request) => (
          <Card key={request._id} sx={{ boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" color="primary">
                    {request.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {request.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {request.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Message:</strong> {request.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Address:</strong> {request.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted:</strong> {new Date(request.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAccept(request._id)}
                sx={{ mr: 1 }}
              >
                {status ? "ACCEPTED" : "ACCEPT"}
              </Button>
              { rejected ? " " : 
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleReject(request._id)}
              >
                Reject
              </Button>
               }
            </CardActions>
          </Card>
        ))}
      </Stack>

      {requests.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No adoption requests found
        </Typography>
      )}
    </Box>
  );
}

export default ManageRequest;