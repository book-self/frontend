import React from 'react';
import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const menu = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Profile',
      path: '/profile'
    },
    {
      name: 'Login',
      path: '/login'
    }
  ];

  return (
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
          <IconButton color="inherit" aria-label="account">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
