import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
  
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 8,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  }));
  
  const ImageBox = styled(Box)(({ theme }) => ({
    width: '100%',
    maxHeight: '400px',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: theme.spacing(3),
  }));
  
  const Blog = () => {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header Section */}
        <StyledPaper elevation={3}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}
          >
            Welcome to My Pet: Your Journey to Pet Adoption
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Transforming Lives, One Paw at a Time Since 2020
          </Typography>
  
          <ImageBox>
            <img
              src="https://www.shutterstock.com/image-photo/dog-animal-pet-cat-cute-260nw-2521815587.jpg"
              alt="Pet Adoption"
              style={{ width: '100%', height: 'auto' }}
            />
          </ImageBox>
  
          {/* Introduction */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            About My Pet
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Founded in 2020 in the vibrant city of Mangalore, My Pet is a dedicated pet adoption organization committed to finding loving homes for animals in need. What started as a small initiative by a group of passionate animal lovers has grown into a thriving community effort. Our mission is simple yet profound: to give every pet a second chance at happiness and to create lasting bonds between pets and their new families. Over the years, we’ve successfully placed hundreds of pets—from playful puppies to wise senior dogs—into caring homes across the region.
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* Adoption Notice */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Adopt a Furry Friend Today!
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Are you ready to bring joy, love, and wagging tails into your life? At My Pet, we have a wonderful group of pets eagerly awaiting their forever homes. From energetic German Shepherds to cuddly mixed breeds, each pet has a unique story and a heart full of affection to share. Adopting a pet is a life-changing experience that not only transforms the life of an animal but also enriches yours with companionship and unconditional love.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Our adoption process is designed to be seamless and supportive. Visit our shelter in Mangalore, meet our adorable residents, and find your perfect match. All our pets are vaccinated, microchipped, and health-checked, ensuring they’re ready to join your family. We also offer post-adoption guidance, including training tips and veterinary advice, to help you and your new companion settle in comfortably.
          </Typography>
  
          {/* Event Section */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Join Our Special Adoption Event
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Mark your calendars! This weekend, My Pet is hosting a special adoption event at our shelter. Adoption fees will be waived for senior pets, and every adopter will receive a complimentary starter kit with essentials like food, toys, and a leash. Can’t adopt right now? You can still make a difference by fostering a pet or donating to support our ongoing efforts. Every contribution helps us continue our mission of rescuing and rehoming pets in need.
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* Why Adopt? */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Why Choose Adoption?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Adopting from My Pet means saving a life. Shelters across Mangalore are often overcrowded, and by choosing adoption, you’re giving a deserving pet a chance to thrive. Plus, adopted pets often show incredible gratitude and loyalty, forming deep bonds with their new families.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Beyond the emotional rewards, adoption supports our community efforts. Since 2020, we’ve expanded our outreach, partnering with local veterinarians and schools to promote responsible pet ownership and animal welfare education in Mangalore and beyond.
              </Typography>
            </Grid>
          </Grid>
  
          {/* Call to Action */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Ready to Adopt?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Let’s give these deserving pets the loving homes they deserve. Visit us or get in touch today!
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5, fontSize: '1.1rem', textTransform: 'none' }}
                href="mailto:sanmithdevadiga91@gmail.com"
              >
                Contact Us
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ py: 1.5, fontSize: '1.1rem', textTransform: 'none' }}
                href="http://www.mypet.org"
                target="_blank"
              >
                Visit Website
              </Button>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Shelter Address: My Pet, 123 Love Lane, Mangalore | Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Event Date: March 02, 2025
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    );
  };
  
  export default Blog;