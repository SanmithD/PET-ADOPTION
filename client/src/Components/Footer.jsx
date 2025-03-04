import { Email, Facebook, Instagram, LocationOn, Pets, Phone, Twitter } from '@mui/icons-material';
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[400],
        py: 6,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Website Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              MYPET
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Helping pets find loving homes since 2023. Join us in creating happy endings for our furry friends.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton href="/adoptions" sx={{ color: 'secondary.main' }}>
                <Pets />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Link href="/adopt" color="text.secondary" display="block" variant="body2">Adopt a Pet</Link>
            <Link href="/donate" color="text.secondary" display="block" variant="body2">Donate</Link>
            <Link href="/volunteer" color="text.secondary" display="block" variant="body2">Volunteer</Link>
            <Link href="/blog" color="text.secondary" display="block" variant="body2">Blog</Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography variant="body2" color="text.secondary">
              <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              123 Pet Care Avenue
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              <Phone fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              <Email fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              adoptapet@mypet.org
            </Typography>
          </Grid>

          {/* Policies */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Policies</Typography>
            <Link href="/privacy" color="text.secondary" display="block" variant="body2">Privacy Policy</Link>
            <Link href="/terms" color="text.secondary" display="block" variant="body2">Terms of Service</Link>
            <Link href="/faq" color="text.secondary" display="block" variant="body2">FAQs</Link>
            <Link href="/sitemap" color="text.secondary" display="block" variant="body2">Site Map</Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} MYPET. All rights reserved. 
          Proudly non-profit 501(c)(3) organization
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;