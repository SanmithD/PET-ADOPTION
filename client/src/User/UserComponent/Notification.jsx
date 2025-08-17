import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const DateTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function Notification() {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchNotification = async () => {
    try {
      if (!id || id.length !== 24) {
        throw new Error("Invalid notification ID");
      }

      setLoading(true);
      const response = await axios.get(
        `${VITE_API_BASE_URL}/notification/getByIdNotification/${id}`
      );
      setNotification(response.data.response);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch notification");
      console.error("Error fetching notification:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [id]);

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        {loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && notification && (
          <Box>
            <DateTypography variant="body2" color="text.secondary">
              {notification.createdAt
                ? new Date(notification.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date not available"}
            </DateTypography>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {notification.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {notification.message}
            </Typography>
          </Box>
        )}

        {!loading && !error && !notification && (
          <Typography variant="body1" color="text.secondary">
            No notification found
          </Typography>
        )}
      </StyledPaper>
    </Container>
  );
}

export default Notification;