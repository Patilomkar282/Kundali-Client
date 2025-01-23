import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // Make sure to install axios: npm install axios
import '../css/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Make API call to backend
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber
      });

      if (response.data.success) {
        // Optional: Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Show success message (you might want to add a toast notification here)
        alert('Registration successful! Please login.');
        
        // Navigate to login page
        navigate('/login');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'An error occurred during registration. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="signup" className="signup-section">
      <div className="signup-container">
        <motion.div 
          className="signup-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Join our community and start your journey</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password (min. 8 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength="8"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>


              <div className="form-group full-width">
                <label>Gender</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    />
                    <span>Male</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    />
                     <span>Female</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === 'other'}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    />
                    <span>Other</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    required
                  />
                </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>


              {/* Rest of your form groups remain the same */}
              
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>

            <div className="login-prompt">
              Already have an account? 
              <motion.span
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/login')}
                className="login-link"
              >
                Login here
              </motion.span>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Signup;