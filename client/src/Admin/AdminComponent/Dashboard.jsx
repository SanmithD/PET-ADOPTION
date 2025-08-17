import {
  Assignment,
  Feedback,
  Mail,
  Menu,
  Person,
  Pets,
  PostAdd
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const listItems = [
    { text: 'Manage Requests', icon: <Assignment />, path: '/admin/manageRequest' },
    { text: 'View Feedbacks', icon: <Feedback />, path: '/admin/viewFeedback' },
    { text: 'Contact Messages', icon: <Mail />, path: '/admin/reply' },
    { text: 'Posts Notification', icon: <PostAdd />, path: `/admin/postNotification` },
    { text: 'Profile', icon: <Person />, path: '/admin/profile' },
    { text: 'Post New Pet', icon: <Pets />, path: '/admin/postNewPet' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {listItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            selected={selectedItem === index}
            onClick={() => setSelectedItem(index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link to={item.path} style={{ textDecoration: 'none', color: 'black', fontWeight: 500 }} ><ListItemText primary={item.text} /></Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {listItems[selectedItem].text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;