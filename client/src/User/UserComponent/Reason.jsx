import { Box, Container, Typography } from '@mui/material';
import reason from '../../assets/sadDog.png';

function Reason() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, sm: 4, md: 6 }, // Responsive padding
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: { xs: 2, sm: 4, md: 8 }, // Responsive gap
          flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            width: { xs: '100%', sm: '80%', md: '40%', }, // Responsive width
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start', mr: '-160px' }, // Center on mobile
            mb: { xs: 2, md: 0 }, // Margin bottom only on mobile
          }}
        >
          <img
            src={reason}
            alt="Sad dog waiting for adoption"
            style={{
              width: '100%',
              maxWidth: { xs: '300px', md: '400px' }, // Responsive max width
              height: 'auto',
              paddingLeft: { xs: 0, md: '30px' }, // Left padding only on desktop
              borderRadius: '8px', // Slight rounding for polish
            }}
          />
        </Box>

        {/* Text Section */}
        <Typography
          variant="body1"
          sx={{
            textAlign: { xs: 'center', md: 'left' }, // Center on mobile, left on desktop
            lineHeight: 1.6,
            color: 'text.secondary',
            maxWidth: { xs: '100%', md: '60%' }, // Full width on mobile, 60% on desktop
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }, // Responsive font size
          }}
        >
          Adopting pets is a compassionate choice that transforms lives—both theirs and ours. Every year, millions of animals end up in shelters, waiting for a second chance. By adopting, we save these innocent beings from uncertainty, offering them love, safety, and a forever home. Pets bring immense joy, companionship, and emotional support, enriching our lives in ways we often underestimate. Studies show pet owners experience lower stress levels, increased physical activity, and improved mental well-being—benefits that ripple through families and communities.
          <br /><br />
          Shelter pets are often already vaccinated, spayed, or neutered, making adoption a cost-effective alternative to buying from breeders or pet stores, which can fuel puppy mills. Each adoption also frees up space in shelters, allowing more animals to be rescued. These pets come in all shapes, sizes, and ages, ensuring there’s a perfect match for everyone—whether you want a playful pup or a mellow senior cat.
          <br /><br />
          Beyond practicality, adoption is an ethical stand against overpopulation and abandonment. It’s a commitment to giving a deserving animal a fresh start while teaching empathy and responsibility. When we adopt, we don’t just gain a pet—we become part of a larger movement to create a kinder world, one wagging tail or gentle purr at a time.
        </Typography>
      </Box>
    </Container>
  );
}

export default Reason;