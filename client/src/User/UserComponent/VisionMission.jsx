import {
  Box,
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
  
  const SectionBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 4,
    backgroundColor: theme.palette.grey[50],
  }));
  
  const VisionMission = () => {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <StyledPaper elevation={3}>
          {/* Header Section */}
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}
          >
            Vision & Mission
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            My Pet: Building a Better Future for Pets Since 2020
          </Typography>
  
          <Divider sx={{ my: 4 }} />
  
          {/* Vision Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Our Vision
          </Typography>
          <SectionBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  At My Pet, we envision a world where every pet finds a loving, forever home. Since our inception in 2020 in Mangalore, our goal has been to create a compassionate community where no animal is left behind. We strive to eliminate pet homelessness by promoting adoption, fostering responsible pet ownership, and advocating for animal welfare across the region and beyond.
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  Our vision extends to a future where pets and people thrive together in harmony. We aim to set a benchmark for pet care standards, ensuring that every animal receives the love, medical attention, and respect they deserve. By 2030, we hope to expand our reach, transforming Mangalore into a model city for pet adoption and care, inspiring similar efforts nationwide.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://www.ray-psp.com/img/vision.jpg"
                  alt="Vision"
                  sx={{ width: '100%', borderRadius: 4 }}
                />
              </Grid>
            </Grid>
          </SectionBox>
  
          <Divider sx={{ my: 4 }} />
  
          {/* Mission Section */}
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Our Mission
          </Typography>
          <SectionBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src="https://bdms.org.in/admin/Uploads/Rules/mission.png"
                  alt="Mission"
                  sx={{ width: '100%', borderRadius: 4 }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  My Pet’s mission is to rescue, rehabilitate, and rehome pets in need while fostering a culture of empathy and responsibility. Based in Mangalore since 2020, we work tirelessly to provide shelter, medical care, and affection to abandoned and stray animals. Our dedicated team ensures each pet is vaccinated, microchipped, and ready for adoption into a loving family.
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  We are committed to educating our community about the joys and responsibilities of pet ownership. Through partnerships with local veterinarians, schools, and volunteers, we conduct workshops, adoption drives, and awareness campaigns. Our mission includes supporting pet owners with resources like training guides and affordable vet services, ensuring every adoption is a success. Together, we aim to reduce pet overpopulation and cruelty, making Mangalore a haven for pets and their families.
                </Typography>
              </Grid>
            </Grid>
          </SectionBox>
  
          {/* Core Values Section */}
          <Divider sx={{ my: 4 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Our Core Values
          </Typography>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Compassion
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Treating every pet with kindness and understanding, ensuring their well-being is our top priority.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Community
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Building a supportive network of pet lovers, volunteers, and advocates in Mangalore and beyond.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Commitment
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Staying dedicated to our cause, ensuring every pet finds a home and every owner finds joy.
              </Typography>
            </Box>
          </Stack>
  
          {/* Closing Statement */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Join Us in Our Journey
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Since starting in 2020, My Pet has been driven by a passion for animals and a vision for a better tomorrow. Together, we can make a difference—one pet at a time.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              My Pet Shelter, 123 Love Lane, Mangalore | Established: 2020
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    );
  };
  
  export default VisionMission;