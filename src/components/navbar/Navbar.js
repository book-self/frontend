import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styles from './Navbar.module.css';

export function Navbar() {
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
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" m="3" className={styles.title}>
          BookSelf
        </Typography>

        {menu.map((item, index) => (
          <Button component={Link} key={index} to={item.path} p={2} color="inherit">{item.name}</Button>
        ))}

        <IconButton color="inherit" aria-label="account">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
