import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import puppy from '../../assets/puppy.jpg';

function Main() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: { xs: 'center', sm: 'flex-start' }, 
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
          backgroundImage: `url(${puppy})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Typography
        sx={{
          zIndex: 1,
          fontSize: { xs: '4rem', sm: '6rem', md: '8rem', lg: '10rem' },
          fontWeight: 600,
          fontFamily: 'sans-serif',
          color: '#fff',
          textAlign: { xs: 'center', sm: 'left' },
          px: { xs: 2, sm: 4 },
          mt: { xs: 2, sm: 0 }, 
        }}
      >
        MY PET
      </Typography>
      <Typography
        sx={{
          zIndex: 1,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, 
          fontWeight: 500,
          fontFamily: 'sans-serif',
          color: '#20a7db',
          textAlign: { xs: 'center', sm: 'left' },
          px: { xs: 2, sm: 4 },
          mt: { xs: 2, sm: 4 },
        }}
      >
        WELCOME YOUR NEW MEMBER
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/view')}
        sx={{
          zIndex: 1,
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, 
          fontWeight: 500,
          fontFamily: 'sans-serif',
          color: '#fff',
          backgroundColor: 'orangered',
          mt: { xs: 2, sm: 4 },
          px: { xs: 3, sm: 4 }, 
          py: 1.5,
          '&:hover': { backgroundColor: '#e65c00' },
        }}
      >
        ADOPT
      </Button>
    </Box>
  );
}

export default Main;