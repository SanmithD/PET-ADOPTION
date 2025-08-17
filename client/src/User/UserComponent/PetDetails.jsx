import { Box, Button, Chip, CircularProgress, Container, Divider, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petInfo, setPetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getPetData = async () => {
    try {
      const response = await axios.get(`${VITE_API_BASE_URL}/pet/getPetById/${id}`);
      const data = response.data.response ? response.data.response : null;
      setPetInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pet details:', error);
      setError('Failed to load pet details. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetData();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !petInfo) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          {error || 'Pet not found'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box
            component="img"
            src={petInfo.petImage || 'https://via.placeholder.com/300'}
            alt={`${petInfo.breed} image`}
            sx={{
              width: { xs: '100%', md: 300 },
              height: 300,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {petInfo.breed || 'Unknown Breed'}
            </Typography>
            <Chip
              label={`Pet #: ${petInfo.petNumber || 'N/A'}`}
              color="primary"
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              Age: {petInfo.age || 'Unknown'}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 1 }}>
              {petInfo.description || 'No description available'}
            </Typography>
            <Button variant='contained' onClick={()=>navigate('/adopt')} sx={{ backgroundColor: 'orangered', color: 'white', fontWeight: 600, p: 2 }} >ADOPT</Button>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Additional Info */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Additional Details
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Added:</strong>{' '}
              {petInfo.createdAt
                ? new Date(petInfo.createdAt).toLocaleString()
                : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Last Updated:</strong>{' '}
              {petInfo.updatedAt
                ? new Date(petInfo.updatedAt).toLocaleString()
                : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>ID:</strong> {petInfo._id || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default PetDetails;