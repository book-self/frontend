import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, ButtonBase, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { useStyles } from './NavbarStyles';


export const Navbar = () => {
  const classes = useStyles();
  const loggedIn = false;

  return (
    <div className={classes.appBarContainer}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>

            <Link to={'/'} style={{textDecoration: 'none'}}>
              <ButtonBase>
                <div className={classes.toolBarLeftContainer}>
                    <Typography className={classes.title}>Book</Typography>
                    <img src={process.env.PUBLIC_URL + '/open-book.png'} alt={"Book Self Logo"} className={classes.image} />
                    <Typography className={classes.title}><b>Self</b></Typography>
                </div>
              </ButtonBase>
            </Link>

          <div>
            <IconButton aria-label="account">
              <Link to={loggedIn ? '/profile' : '/login'} >
                <AccountCircle className={classes.accountIcon} />
              </Link>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
