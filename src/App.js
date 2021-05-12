import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Router } from './router';

function App() {
  return (
    <div>
      <Navbar />
      <Router />
      { /* TODO re-implement the Footer at some point */ }
    </div>
  );
}

export default App;
