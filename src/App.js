import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Router } from './router';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />

        <Router />
      </header>
    </div>
  );
}

export default App;
