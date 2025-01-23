import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">Kundali</Link>
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a 
                href="/#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/#services" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="/#about" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                About
              </a>
            </li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="/#signup" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('signup');
                }} 
                className="signup-button"
              >
                Sign Up
              </a>
            </motion.li>
          </ul>
        </div>
        
        {/* Add hamburger menu for mobile */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;