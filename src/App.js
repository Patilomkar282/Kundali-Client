import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <About />
              <Signup />
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;