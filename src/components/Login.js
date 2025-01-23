import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

 // ... existing code ...

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the auth token in localStorage
        localStorage.setItem('token', data.token);
        // Navigate to dashboard on successful login
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

// ... existing code ...

  return (
    
    <div className="login-page">
        
      <div className="login-container">
        <motion.div 
          className="login-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Please enter your credentials to login</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          <div className="signup-prompt">
            <p>Don't have an account?</p>
            <Link to="/#signup" className="signup-link">
              Sign up now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;