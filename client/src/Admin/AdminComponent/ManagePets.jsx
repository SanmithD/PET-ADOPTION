import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
    borderRadius: 4,
  }));
  
  const PetItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
  }));
  
  function ManagePets() {
    const [petsData, setPetsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editPet, setEditPet] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const [newPetForm, setNewPetForm] = useState({
      breed: '',
      age: '',
      description: '',
      petNumber: '',
      petImage: null,
    });
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
    const getAllPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${VITE_API_BASE_URL}/pet/getAllPet`);
        setPetsData(response.data.response || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch pets: ' + (err.response?.data?.message || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    const handlePost = async (e) => {
      e.preventDefault();
      if (!newPetForm.breed || !newPetForm.petNumber || !newPetForm.description) {
        setError('Breed, Pet Number, and Description are required');
        return;
      }
  
      setLoading(true);
      setError(null);
  
      const formData = new FormData();
      formData.append('breed', newPetForm.breed);
      formData.append('age', newPetForm.age);
      formData.append('description', newPetForm.description);
      formData.append('petNumber', newPetForm.petNumber);
      if (newPetForm.petImage) {
        formData.append('petImage', newPetForm.petImage);
      }
  
      try {
        await axios.post(`${VITE_API_BASE_URL}/pet/postPet`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNewPetForm({ breed: '', age: '', description: '', petNumber: '', petImage: null });
        await getAllPets();
      } catch (err) {
        setError('Failed to post pet: ' + (err.response?.data?.message || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const filteredPets = petsData.filter(pet =>
        pet.breed?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
    const handleUpdate = async () => {
      if (!editPet.breed || !editPet.petNumber || !editPet.description) {
        setError('Breed, Pet Number, and Description are required');
        return;
      }
  
      setLoading(true);
      setError(null);
  
      const formData = new FormData();
      formData.append('breed', editPet.breed);
      formData.append('age', editPet.age);
      formData.append('description', editPet.description);
      formData.append('petNumber', editPet.petNumber);
    //   if (editPet.petImage instanceof File) {
        formData.append('petImage', editPet.petImage);
    //   }
  
      try {
        await axios.put(`${VITE_API_BASE_URL}/pet/updatePet/${editPet._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEditPet(null);
        await getAllPets();
      } catch (err) {
        setError('Failed to update pet: ' + (err.response?.data?.message || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      setLoading(true);
      setError(null);
  
      try {
        await axios.delete(`${VITE_API_BASE_URL}/pet/deletePet/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        await getAllPets();
      } catch (err) {
        setError('Failed to delete pet: ' + (err.response?.data?.message || err.message));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleNewPetChange = (e) => {
      const { name, value, files } = e.target;
      setNewPetForm({
        ...newPetForm,
        [name]: name === 'petImage' ? files[0] : value,
      });
    };
  
    const handleEditChange = (e) => {
      const { name, value, files } = e.target;
      setEditPet({
        ...editPet,
        [name]: name === 'petImage' ? files[0] : value,
      });
    };
  
    useEffect(() => {
      getAllPets();
    }, []);
  
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };
  
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Post New Pet Form */}
        <StyledPaper elevation={3}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Add New Pet
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <form onSubmit={handlePost}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="petImage"
                type="file"
                onChange={handleNewPetChange}
                variant="outlined"
                inputProps={{ accept: 'image/*' }}
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Breed"
                name="breed"
                value={newPetForm.breed}
                onChange={handleNewPetChange}
                required
                variant="outlined"
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={newPetForm.age}
                onChange={handleNewPetChange}
                variant="outlined"
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Pet Number"
                name="petNumber"
                value={newPetForm.petNumber}
                onChange={handleNewPetChange}
                required
                variant="outlined"
                disabled={loading}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={newPetForm.description}
                onChange={handleNewPetChange}
                required
                variant="outlined"
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'none' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Post Pet'}
              </Button>
            </Stack>
          </form>
        </StyledPaper>

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
          ) :(
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Manage Pets
          </Typography>
          {loading && !filteredPets.length ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : filteredPets.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No pets found
            </Typography>
          ) : (
            <Stack spacing={2}>
              {filteredPets.map((pet) => (
                <PetItem key={pet._id} elevation={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6">{pet.breed}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Age: {pet.age || 'Not specified'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pet Number: {pet.petNumber}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {pet.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Created: {formatDate(pet.createdAt)} | Updated: {formatDate(pet.updatedAt)}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setEditPet(pet)}
                        disabled={loading}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(pet._id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                  {pet.petImage && (
                    <Box mt={2}>
                      <img
                        src={pet.petImage}
                        alt={`${pet.breed}`}
                        style={{ maxWidth: '200px', borderRadius: '4px' }}
                      />
                    </Box>
                  )}
                </PetItem>
              ))}
            </Stack>
          )}
        </Box>
          ) }
        {/* Pet List */}
  
        {/* Update Pet Dialog */}
        <Dialog open={!!editPet} onClose={() => setEditPet(null)}>
          <DialogTitle>Update Pet</DialogTitle>
          <DialogContent>
            {editPet && (
              <Stack spacing={3} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  name="petImage"
                  type="file"
                  onChange={handleEditChange}
                  variant="outlined"
                  inputProps={{ accept: 'image/*' }}
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  label="Breed"
                  name="breed"
                  value={editPet.breed}
                  onChange={handleEditChange}
                  required
                  variant="outlined"
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={editPet.age}
                  onChange={handleEditChange}
                  variant="outlined"
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  label="Pet Number"
                  name="petNumber"
                  value={editPet.petNumber}
                  onChange={handleEditChange}
                  required
                  variant="outlined"
                  disabled={loading}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={editPet.description}
                  onChange={handleEditChange}
                  required
                  variant="outlined"
                  disabled={loading}
                />
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditPet(null)} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
  
  export default ManagePets;