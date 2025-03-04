import PaymentIcon from '@mui/icons-material/Payment';
import { Avatar, Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import QR from '../../../public/GooglePay_QR.png';

function Donation() {
  const donationText = `Your generous donations directly impact our ability to provide safe shelter, medical care, 
  and proper nutrition for abandoned animals waiting for their forever homes. Every contribution helps us maintain 
  our facilities, fund vital veterinary treatments, and support community outreach programs that promote responsible 
  pet ownership. By donating, you become an essential partner in our mission to rescue, rehabilitate, and rehome 
  animals in need. Your support enables us to continue our life-saving work, ensuring every animal receives the care 
  and attention they deserve while we work to match them with loving families. Together, we can create a community 
  where every pet has a chance at a happy, healthy life.`;

  const upiLink = "upi://pay?pa=sanmithdevadiga91@okaxis&pn=Sanmith%20Devadiga&cu=INR";

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main',
        mb: 4
      }}>
        Support Our Animal Rescue Efforts
      </Typography>

      <Grid container spacing={6} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Why Your Donation Matters
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
              {donationText}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ p: 2, mb: 3, borderRadius: 4, boxShadow: 3 }}>
              <Avatar 
                variant="square" 
                src={QR} 
                alt="Google Pay QR Code"
                sx={{ 
                  width: 300, 
                  height: 300,
                  borderRadius: 2
                }}
              />
            </Card>

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                window.location.href = "upi://pay?pa=sanmithdevadiga91@okaxis&pn=Sanmith%20Devadiga&cu=INR";
              }}
              target="_blank"
              startIcon={<PaymentIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 50,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: 4,
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              Instant Donation via UPI
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" align="center" sx={{ 
        mt: 6, 
        color: 'text.secondary',
        fontStyle: 'italic'
      }}>
        Every contribution makes a difference. Thank you for being a hero for animals in need!
      </Typography>
    </Container>
  );
}

export default Donation;