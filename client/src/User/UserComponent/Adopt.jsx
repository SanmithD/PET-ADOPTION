import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

function Adopt() {
    const [petForm, setPetForm] = useState({
        userName: '',
        breed: '',
        email: '',
        phoneNumber: '',
        message: '',
        address: ''
    });
    const [alert, setAlter] = useState(false);

    const adoptionText = `Pet adoption is a life-changing decision that brings immense joy while saving animal lives. 
    By choosing adoption, you're giving a second chance to animals who have often survived abandonment, neglect, 
    or difficult circumstances. Our adoption process ensures perfect matches between pets and families through 
    careful screening and support. Every adopted pet helps free up space in shelters for other animals in need. 
    Adopted pets show remarkable resilience and gratitude, often forming deep bonds with their new families. 
    We provide full medical histories, vaccinations, and spay/neuter services to ensure your new companion is 
    ready for home life. Beyond saving animals, adoption reduces demand for puppy mills and supports ethical 
    treatment of pets. Our team offers post-adoption support including training resources and veterinary referrals 
    to ensure successful transitions. Remember, adoption is a lifelong commitment - pets can live 10-15 years or 
    more, requiring stable care and financial planning. By adopting, you join a compassionate community dedicated 
    to animal welfare and become part of your pet's redemption story.`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetForm(prev => ({ ...prev, [name]: value }));
    }

    const handleRequest = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/api/adoption/makeRequest', petForm,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAlter(true);
            setTimeout(()=>{
                setAlter(false);
            },2000);
            setPetForm({
                userName: '',
                breed: '',
                email: '',
                phoneNumber: '',
                message: '',
                address: ''
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
                fontWeight: 'bold', 
                color: 'primary.main',
                mb: 2
            }}>
                Pet Adoption Application
            </Typography>
            { alert ? <Alert severity='success' variant='outlined' style={{ position: 'absolute', top: 100, right: 70, zIndex: 1 }} >Request Sended</Alert> : '' }

            <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 4 }}>
                <form onSubmit={handleRequest}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="userName"
                            value={petForm.userName}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                        
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <TextField
                                fullWidth
                                label="Preferred Breed"
                                name="breed"
                                value={petForm.breed}
                                onChange={handleChange}
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={petForm.phoneNumber}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />
                        </Box>

                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            name="email"
                            value={petForm.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Full Address"
                            name="address"
                            value={petForm.address}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            multiline
                            rows={2}
                        />

                        <TextField
                            fullWidth
                            label="Tell us about your home environment and pet experience"
                            name="message"
                            value={petForm.message}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={4}
                        />

                        <Button 
                            type="submit"
                            variant="contained" 
                            size="large"
                            sx={{ 
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 2
                            }}
                        >
                            Submit Application
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Typography variant="body1" paragraph sx={{ 
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: 'text.secondary',
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2
            }}>
                {adoptionText}
            </Typography>
        </Container>
    )
}

export default Adopt;