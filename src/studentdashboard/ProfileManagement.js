import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaGithub, FaHackerrank, FaCode, FaGlobe, FaUpload, FaPlus, FaTrash } from 'react-icons/fa';
import { SiHackerearth, SiCodechef } from 'react-icons/si';
import '../css/ProfileManagement.css';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    profilePicture: null,
    education: [], // Changed to array
    profiles: {    // Changed from links to profiles
      github: '',
      leetcode: '',
      hackerrank: '',
      hackerearth: '',
      codechef: '',
      portfolio: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    calculateCompletion();
  }, [profile, previewImage]);

  const calculateCompletion = () => {
    let filled = 0;
    let total = 0;

    // Education fields
    if (profile.education && Array.isArray(profile.education)) {
      profile.education.forEach(edu => {
        if (edu) {
          total += 3; // instituteName, marksObtained, yearOfCompletion
          if (edu.instituteName) filled++;
          if (edu.marksObtained) filled++;
          if (edu.yearOfCompletion) filled++;
        }
      });
    }

    // Profile links
    if (profile.profiles) {
      Object.values(profile.profiles).forEach(link => {
        total++;
        if (link && link.trim() !== '') filled++;
      });
    }

    // Profile picture
    total++;
    if (profile.profilePicture || previewImage) filled++;

    const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;
    setCompletionPercentage(percentage);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Raw token:', token); // Debug log

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer prefix here
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data); // Debug log

      if (response.data.status === 'success' && response.data.data.user) {
        const userData = response.data.data.user;
        setProfile(prevProfile => ({
          ...prevProfile,
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || '',
          dateOfBirth: userData.dateOfBirth || '',
          gender: userData.gender || '',
          phoneNumber: userData.phoneNumber || '',
          education: userData.education || [],
          profiles: userData.profiles || {
            github: '',
            leetcode: '',
            hackerrank: '',
            hackerearth: '',
            codechef: '',
            portfolio: ''
          }
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error('Full error details:', error.response || error);
      
      if (error.response?.status === 401) {
        console.log('Authentication failed, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError('Failed to fetch user data: ' + (error.response?.data?.message || error.message));
      }
      setLoading(false);
    }
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...profile.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setProfile({
      ...profile,
      education: newEducation
    });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        {
          instituteName: '',
          marksObtained: '',
          yearOfCompletion: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = profile.education.filter((_, i) => i !== index);
    setProfile({
      ...profile,
      education: newEducation
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const updateData = {
        education: profile.education.map(edu => ({
          instituteName: edu.instituteName,
          marksObtained: edu.marksObtained,
          yearOfCompletion: edu.yearOfCompletion
        })),
        profiles: {
          github: profile.profiles.github,
          leetcode: profile.profiles.leetcode,
          hackerrank: profile.profiles.hackerrank,
          hackerearth: profile.profiles.hackerearth,
          codechef: profile.profiles.codechef,
          portfolio: profile.profiles.portfolio
        }
      };

      console.log('Sending update data:', updateData);

      const response = await axios.patch(
        'http://localhost:5000/api/users/profile',
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Add Bearer prefix here
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data);

      if (response.data.status === 'success') {
        alert('Profile updated successfully!');
        fetchUserData();
      }
    } catch (error) {
      console.error('Update error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profile-container">
      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading profile data...</p>
        </div>
      ) : (
        <>
          <div className="completion-bar-container">
            <h4>Profile Completion</h4>
            <div className="completion-bar">
              <div 
                className="completion-progress"
                style={{ width: `${completionPercentage}%` }}
              />
              <span className="completion-percentage">{completionPercentage}% Complete</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information - Read Only */}
            <section className="form-section">
              <h3>Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    disabled
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="text"
                    value={profile.dateOfBirth}
                    disabled
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <input
                    type="text"
                    value={profile.gender}
                    disabled
                    className="readonly-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={profile.phoneNumber}
                    disabled
                    className="readonly-input"
                  />
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="form-section">
              <h3>Education Details</h3>
              <button 
                type="button" 
                onClick={addEducation}
                className="add-education-btn"
              >
                <FaPlus /> Add Education
              </button>
              
              {profile.education.map((edu, index) => (
                <div key={index} className="education-block">
                  <div className="education-header">
                    <h4>Education #{index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeEducation(index)}
                      className="remove-education-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="education-grid">
                    <div className="form-group">
                      <label>Institute Name</label>
                      <input
                        type="text"
                        value={edu.instituteName || ''}
                        onChange={(e) => handleEducationChange(index, 'instituteName', e.target.value)}
                        placeholder="Enter institute name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Marks Obtained (%)</label>
                      <input
                        type="number"
                        value={edu.marksObtained || ''}
                        onChange={(e) => handleEducationChange(index, 'marksObtained', e.target.value)}
                        placeholder="Enter marks percentage"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="form-group">
                      <label>Year of Completion</label>
                      <input
                        type="number"
                        value={edu.yearOfCompletion || ''}
                        onChange={(e) => handleEducationChange(index, 'yearOfCompletion', e.target.value)}
                        placeholder="Enter completion year"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Coding Profile Links */}
            <section className="form-section">
              <h3>Coding Profiles</h3>
              <div className="links-grid">
                <div className="form-group">
                  <label><FaGithub /> GitHub Profile</label>
                  <input
                    type="url"
                    value={profile.profiles.github}
                    onChange={(e) => setProfile({
                      ...profile,
                      profiles: { ...profile.profiles, github: e.target.value }
                    })}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="form-group">
                  <label><FaCode /> LeetCode Profile</label>
                  <input
                    type="url"
                    value={profile.profiles.leetcode}
                    onChange={(e) => setProfile({
                      ...profile,
                      profiles: { ...profile.profiles, leetcode: e.target.value }
                    })}
                    placeholder="https://leetcode.com/username"
                  />
                </div>

                <div className="form-group">
                  <label><FaHackerrank /> HackerRank Profile</label>
                  <input
                    type="url"
                    value={profile.profiles.hackerrank}
                    onChange={(e) => setProfile({
                      ...profile,
                      profiles: { ...profile.profiles, hackerrank: e.target.value }
                    })}
                    placeholder="https://hackerrank.com/username"
                  />
                </div>

                <div className="form-group">
                  <label><SiHackerearth /> HackerEarth Profile</label>
                  <input
                    type="url"
                    value={profile.profiles.hackerearth}
                    onChange={(e) => setProfile({
                      ...profile,
                      profiles: { ...profile.profiles, hackerearth: e.target.value }
                    })}
                    placeholder="https://hackerearth.com/@username"
                  />
                </div>

                <div className="form-group">
                  <label><SiCodechef /> CodeChef Profile</label>
                  <input
                    type="url"
                    value={profile.profiles.codechef}
                    onChange={(e) => setProfile({
                      ...profile,
                      profiles: { ...profile.profiles, codechef: e.target.value }
                    })}
                    placeholder="https://codechef.com/users/username"
                  />
                </div>

                <div className="form-group">
                  <label><FaGlobe /> Personal Portfolio</label>
                  <input
                    type="url"
                    value={profile.profiles.portfolio}
                    onChange={(e) => setProfile({
                      ...profile,
                      profiles: { ...profile.profiles, portfolio: e.target.value }
                    })}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </section>

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </motion.button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfileManagement;