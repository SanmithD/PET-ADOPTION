import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
  function View() {
    const navigate = useNavigate();
    const [petData, setPetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
    const getAllPetData = async () => {
      try {
        const response = await axios.get(`${VITE_API_BASE_URL}/pet/getAllPet`);
        const data = Array.isArray(response.data.response) ? response.data.response : [];
        setPetData(data);
      } catch (error) {
        console.error('Error fetching pet data:', error);
        setPetData([]);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAllPetData();
    }, []);
  
    const filteredPets = petData.filter(pet =>
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by breed"
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3 }}
          />
        </Box>
  
        {filteredPets.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="textSecondary">
            No pets found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredPets.map((data) => (
              <Grid item xs={12} sm={6} md={4} key={data._id || data.petNumber}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px #3D3737' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={data.petImage}
                    alt={data.breed}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column' }} >
                    <Typography gutterBottom variant="h5" component="div">
                      {data.breed}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      ID: {data.petNumber}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                      {data.description.length > 10 ? data.description.substring(0, 30) + "..." : data.description }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Age: {data.age}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Added: {new Date(data.createdAt).toLocaleDateString()}
                    </Typography>
                    <Button variant='outlined' onClick={()=>navigate(`/petDetails/${data?._id}`)} sx={{ border: '1px solid seagreen', color: 'seagreen', mt: 2, fontWeight: 'bold' }} >VIEW</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    );
  }
  
  export default View;