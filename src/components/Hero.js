import React from 'react';
import { motion } from 'framer-motion';
import '../css/Hero.css';

const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = servicesSection.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div 
    id='hero'
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Empowering Coders with Unified Insights
      </motion.h1>
      <motion.p
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Connect, Learn, and Grow with our Platform
      </motion.p>
      <motion.button
        className="cta-button"
        onClick={scrollToServices}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Explore Services
      </motion.button>
    </motion.div>
  );
};

export default Hero;