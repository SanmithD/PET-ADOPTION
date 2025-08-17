import AccountCircle from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/More';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PetsIcon from '@mui/icons-material/Pets';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notiLength, setNotiLength] = useState(0);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleNotificationsOpen = (event) => setNotificationsAnchorEl(event.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchorEl(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${VITE_API_BASE_URL}/api/notification/getAllNotification`);
        const data = response.data.response || [];
        setNotifications(data);
        setNotiLength(data.length);
      } catch (error) {
        console.log('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const menuItems = [
    { text: 'Feedback', icon: <FeedbackIcon />, path: '/feedback' },
    { text: 'Blog', icon: <BookIcon />, path: '/blog' },
    { text: 'Vision & Mission', icon: <VisibilityIcon />, path: '/vision-mission' },
    { text: 'Rescue Posts', icon: <PetsIcon />, path: '/rescue-posts' },
  ];

  const renderMainMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          minWidth: { xs: 180, sm: 200 },
          borderRadius: 1,
          mt: 1,
        },
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {menuItems.map((item) => (
        <MenuItem
          key={item.text}
          onClick={() => {
            navigate(item.path);
            handleMenuClose();
          }}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'primary.light' },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.text}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        elevation: 3,
        sx: {
          maxHeight: 400,
          width: { xs: '90vw', sm: '20rem', md: '25rem' }, // Responsive width
          borderRadius: 1,
          mt: 1,
          overflowY: 'auto',
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {sortedNotifications.length === 0 ? (
        <MenuItem disabled>
          <Typography variant="body2">No notifications</Typography>
        </MenuItem>
      ) : (
        sortedNotifications.slice(0, 10).map((data) => (
          <MenuItem
            key={data._id}
            onClick={() => {
              navigate(`/notification/${data._id}`);
              handleNotificationsClose();
            }}
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              py: 1.5,
              whiteSpace: 'normal',
              maxWidth: '100%',
            }}
          >
            <Typography variant="h6" color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {data.message.length > 20 ? `${data.message.substring(0, 20)}...` : data.message}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {data.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A'}
            </Typography>
          </MenuItem>
        ))
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id="mobile-menu"
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          minWidth: { xs: 180, sm: 200 },
          borderRadius: 1,
          mt: 1,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => navigate('/view')}>
        <ListItemText>View</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigate('/donation')}>
        <ListItemText>Donate</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigate('/adopt')}>
        <ListItemText>Adopt</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigate('/contact')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <ListItemText>Messages</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleNotificationsOpen}>
        <IconButton size="large" aria-label="show new notifications" color="inherit">
          <Badge badgeContent={notiLength} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <ListItemText>Notifications</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigate('/profile')}>
        <IconButton size="large" aria-label="account of current user" color="inherit">
          <AccountCircle />
        </IconButton>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          px: { xs: 1, sm: 2 }, // Responsive padding
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              onClick={handleMenuOpen}
              sx={{ color: 'black', mr: { xs: 0, sm: 2 } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: 'black',
                cursor: 'pointer',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                display: { xs: 'block' }, // Always visible with responsive size
              }}
              onClick={() => navigate('/')}
            >
              MY PET
            </Typography>
          </Box>

          {/* Middle Section (Desktop Buttons) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              justifyContent: 'center',
              gap: { md: 1, lg: 2 },
            }}
          >
            <Button
              variant="outlined"
              sx={{
                border: '1px solid seagreen',
                color: 'green',
                fontSize: { md: '0.875rem', lg: '1rem' },
                px: { md: 1, lg: 2 },
              }}
              onClick={() => navigate('/view')}
            >
              View
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: '1px solid seagreen',
                color: 'green',
                fontSize: { md: '0.875rem', lg: '1rem' },
                px: { md: 1, lg: 2 },
              }}
              onClick={() => navigate('/donation')}
            >
              Donate
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: '1px solid seagreen',
                color: 'green',
                fontSize: { md: '0.875rem', lg: '1rem' },
                px: { md: 1, lg: 2 },
              }}
              onClick={() => navigate('/adopt')}
            >
              Adopt
            </Button>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                sx={{ color: 'black' }}
                onClick={() => navigate('/contact')}
              >
                <Badge color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show new notifications"
                onClick={handleNotificationsOpen}
                sx={{ color: 'black' }}
              >
                <Badge badgeContent={notiLength} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                onClick={() => navigate('/profile')}
                sx={{ color: 'black' }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                onClick={handleMobileMenuOpen}
                sx={{ color: 'black' }}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMainMenu}
      {renderNotificationsMenu}
      {renderMobileMenu}
    </Box>
  );
}