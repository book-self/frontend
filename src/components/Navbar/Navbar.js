import { useState } from 'react';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [menuStatus, setMenuStatus] = useState(null);

  const openMenu = (event) => {
    setMenuStatus(event.currentTarget);
  };

  const closeMenu = (event) => {
    setMenuStatus(null);
  };

  const menu = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Profile',
      path: '/profile'
    },
    {
      name: 'Sign In',
      path: '/signin'
    },
    {
      name: 'Sign Up',
      path: '/signup'
    }
  ];

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Box mr={2}>
            <Typography variant="h6">
              BookSelf
            </Typography>
          </Box>

          <Box className={styles.left}>
            {menu.map((item, index) => (
              <Button component={Link} key={index} to={item.path} color="inherit">{item.name}</Button>
            ))}
          </Box>

          <Box>
            <IconButton color="inherit" aria-label="account" aria-haspopup="true" onClick={openMenu}>
              <AccountCircle />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={menuStatus}
              keepMounted
              open={Boolean(menuStatus)}
              onClose={closeMenu}
            >
              <MenuItem component={Link} to="/" onClick={closeMenu}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
