import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Navbar } from './components/Navbar/Navbar';
import { Router } from './router';
import './App.css';

function App() {
  return (
    <Grid container>
      <Navbar />

      <Container maxWidth="xl">
        <Box mt={3}>
          <Router />
        </Box>
      </Container>
    </Grid>
  );
}

export default App;
