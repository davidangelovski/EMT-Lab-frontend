import './Header.css';
import {
  AppBar, Box, Button, Chip, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';

const pages = [
  { path: '/', name: 'home' },
  { path: '/books', name: 'books' },
  { path: '/authors', name: 'authors' },
  { path: '/countries', name: 'countries' },
  { path : '/logs', name: 'logs' },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const visiblePages = isLoggedIn ? pages : [pages[0]];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const authButtons = isLoggedIn ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Chip label={`${user?.username} · ${user?.role.toLowerCase()}`} color='secondary' variant='outlined' />
      <Button color='inherit' onClick={handleLogout}>Logout</Button>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button color='inherit' component={Link} to='/login'>Login</Button>
      <Button color='inherit' variant='outlined' component={Link} to='/register' sx={{ borderColor: 'rgba(255,255,255,0.5)' }}>
        Register
      </Button>
    </Box>
  );

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon/>
          </IconButton>

          <Typography variant='h6' component='div' sx={{ mr: 3 }}>
            EMT-LAB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {visiblePages.map((page) => (
              <Link key={page.name} to={page.path}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
            {authButtons}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, p: 1.5 }} role='presentation' onClick={() => setDrawerOpen(false)}>
          <List>
            {visiblePages.map((page) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton component={Link} to={page.path}>
                  <ListItemText primary={page.name} sx={{textTransform: 'capitalize'}}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1.5 }} />
          <List>
            {isLoggedIn ? (
              <>
                <ListItem>
                  <ListItemText primary={user?.username} secondary={`Role: ${user?.role}`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary='Logout' />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/login'>
                    <ListItemText primary='Login' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/register'>
                    <ListItemText primary='Register' />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;