import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Post from './components/Post';
import Profile from './pages/Profile';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Post />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
