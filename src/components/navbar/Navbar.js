import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles, AppBar, ButtonBase, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import styles from './Navbar.module.css';


const useStyles = makeStyles({
  :root {
    --appBarHeight: 90px;
  }
  
  .appBarContainer {
    height: var(--appBarHeight);
  }
  
  .toolBar {
    height: var(--appBarHeight);
    justify-content: 'space-between';
  }
  
  .toolBarLeftContainer {
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
    background-color: 'white';
    padding: '5px 10px';
    border-radius: '5px';
    border: '3px solid black';
  }
  
  .title {
    font-variant: small-caps;
    text-transform: lowercase;
    color: 'black';
    font-size: '1.75rem';
  }
  
  .image {
    width: "50px";
    margin: "0 12px 0 12px";
  }
  
  .toolBarRightContainer {
  
  }  
});


export const Navbar = () => {
  const loggedIn = false;

  return (
    <div className={styles.appBarContainer}>
      <AppBar position="fixed">
        <Toolbar className={styles.toolBar}>

            <Link to={'/'} style={{textDecoration: 'none'}}>
              <div className={styles.toolBarLeftContainer} style={{display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  border: '3px solid black'}}>
                <ButtonBase>
                  <Typography className={styles.title}>Book</Typography>
                  <img src={process.env.PUBLIC_URL + '/open-book.png'} alt={"Book Self Logo"} className={styles.image} width={50} />
                  <Typography className={styles.title}><b>Self</b></Typography>
                </ButtonBase>
              </div>
            </Link>

          <div className={styles.toolBarRightContainer}>
            <IconButton aria-label="account">
              <Link to={loggedIn ? '/profile' : '/login'} >
                <AccountCircle style={{fontSize: '2.5rem', color: 'white'}} />
              </Link>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
