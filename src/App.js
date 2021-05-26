import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Router } from './router';
import './index.css';

import { useStyles } from './AppStyles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Grid className={classes.content}>
        <Navbar />

        <Container component="main" className={classes.main} maxWidth="xl">
          <Box pt={3} pb={3} height="100%">
            <Router />
          </Box>
        </Container>
      </Grid>

      <Grid component="footer" className={classes.footer}>
        <Footer />
      </Grid>
    </div>
  );
}

export default App;
