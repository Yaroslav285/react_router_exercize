import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Home from './components/Home';
import UserDetails from './components/UserDetails';
import Lost from './components/404';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="*" element={<Lost />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
