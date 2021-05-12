import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Router } from '../router';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}
