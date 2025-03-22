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
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ManageRequest() {
  const [requests, setRequests] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const [status, setStatus] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState({
    title: "🎉 Adoption Request Approved!",
    message: `We're thrilled to let you know that your request to adopt your chosen pet has been officially approved. 
    Our team will soon reach out to guide you through the final steps, including documentation, health check records, and scheduling the pickup or home visit. 
    Please ensure your contact details are up to date. If you have any questions in the meantime, feel free to reach out to us.
    Thank you for choosing to give a loving home to a pet in need! 🐾`,
  });
  const [rejectRequest, setRejectRequest] = useState({
    title: "Adoption Request Update",
    message: `Thank you so much for your interest in adopting one of our beloved pets.
  
  After careful consideration, we regret to inform you that your adoption request has not been approved at this time. This decision may be due to several factors, including the specific needs of the pet or matching criteria set to ensure their long-term well-being.
  
  Please don’t be discouraged — we truly appreciate your compassion and encourage you to explore other available pets that may be a better match for your home and lifestyle.
  
  If you’d like more details or assistance in finding the right companion, feel free to contact our team. Your willingness to adopt means the world to us. ❤️`
  });
  

  const allAdoptionRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_PORT}/api/adoption/getAllRequest`
      );
      // Check if response.data.response is an array
      if (Array.isArray(response.data.response)) {
        setRequests(response.data.response);
      } else {
        setRequests([]);
        console.warn("Unexpected response format from API");
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching adoption requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/notification/postNotificationToId/${id}`,
        acceptRequest
      );
      if (Array.isArray(response.data.message)) {
        setRequests(response.data.message);
        setStatus(true);
      } else {
        allAdoptionRequest();
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PORT}/api/notification/postNotificationToId/${id}`,
        rejectRequest
      );
      if (Array.isArray(response.data.message)) {
        setRequests(response.data.message);
      } else {
        allAdoptionRequest();
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  useEffect(() => {
    allAdoptionRequest();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                    <strong>Submitted:</strong>{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleAccept(request.userId)}
                sx={{ mr: 1 }}
                disabled={request.isAccepted}
              >
                {status ? "ACCEPTED" : "ACCEPT"}
              </Button>

              {!request.isAccepted && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleReject(request.userId)}
                >
                  Reject
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Stack>

      {requests.length === 0 && (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No adoption requests found
        </Typography>
      )}
    </Box>
  );
}

export default ManageRequest;