import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Router } from './router';
import './App.css';

function App() {
  return (
    <div className="app">
      <Grid className="content">
        <Navbar />

        <Container component="main" className="main" maxWidth="xl">
          <Box mt={3} mb={3} height="100%">
            <Router />
          </Box>
        </Container>
      </Grid>

      <Grid className="footer">
        <Footer />
      </Grid>
    </div>
  );
}

export default App;
