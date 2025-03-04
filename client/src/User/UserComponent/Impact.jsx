import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const CounterBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3), 
  },
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const CounterNumber = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const Impact = () => {
  const [rescueCount, setRescueCount] = useState(0);
  const [donateCount, setDonateCount] = useState(0);
  const [awardCount, setAwardCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);

  useEffect(() => {
    const animateCounter = (setCounter, target, duration) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounter(target);
          clearInterval(timer);
        } else {
          setCounter(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    };

    animateCounter(setRescueCount, 670, 2000);
    animateCounter(setDonateCount, 450, 2000);
    animateCounter(setAwardCount, 15, 2000);
    animateCounter(setVolunteerCount, 1300, 2000);
  }, []);

  const impactData = [
    {
      count: rescueCount,
      label: 'Rescues',
      description: 'Pets saved from shelters and streets, finding loving homes.',
    },
    {
      count: donateCount,
      label: 'Donated',
      description: 'Contributions helping provide food and medical care for pets.',
    },
    {
      count: awardCount,
      label: 'Awards',
      description: 'Recognitions for our dedication to pet adoption efforts.',
    },
    {
      count: volunteerCount,
      label: 'Volunteers',
      description: 'People helping socialize and care for adoptable pets.',
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, sm: 6, md: 8, mt: -2 },
      }}

      style={{ marginTop: '-500px' }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        }}
      >
        Our Impact
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{
          mb: { xs: 4, sm: 6 }, 
          fontSize: { xs: '1rem', sm: '1.125rem' },
        }}
      >
        Making a difference in pet adoption, one life at a time
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {impactData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CounterBox>
              <CounterNumber
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
                }}
              >
                {item.count}+
              </CounterNumber>
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                sx={{
                  fontSize: { xs: '1.125rem', sm: '1.25rem' }, // Responsive font size
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
                }}
              >
                {item.description}
              </Typography>
            </CounterBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Impact;