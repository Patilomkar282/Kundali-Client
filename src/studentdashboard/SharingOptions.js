import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLinkedin, FaTwitter, FaLink, 
  FaDownload, FaEye, FaEyeSlash, 
  FaShare 
} from 'react-icons/fa';
import '../css/SharingOptions.css';

const SharingOptions = () => {
  const [profileData, setProfileData] = useState(null);
  const [shareableLink, setShareableLink] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    showPersonalInfo: true,
    showEducation: true,
    showPlatformStats: true,
    showCertifications: true
  });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('your-api-endpoint/profile-data');
      const data = await response.json();
      setProfileData(data);
      setShareableLink(`https://kundaliapp.com/${data.username}`);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch profile data');
      setLoading(false);
    }
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const generateShareableLink = async () => {
    try {
      const response = await fetch('your-api-endpoint/generate-share-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ privacySettings })
      });
      const data = await response.json();
      setShareableLink(data.shareLink);
    } catch (error) {
      setError('Failed to generate shareable link');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      setError('Failed to copy link');
    }
  };

  const generatePDFReport = async () => {
    setIsGeneratingPDF(true);
    try {
      const response = await fetch('your-api-endpoint/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ privacySettings })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kundali-profile-report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to generate PDF report');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const shareToSocialMedia = (platform) => {
    const text = `Check out my coding profile and achievements!`;
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableLink)}`
    };
    window.open(urls[platform], '_blank');
  };

  if (loading) {
    return <div className="loading">Loading sharing options...</div>;
  }

  return (
    <div className="sharing-container">
      <h2>Share Your Profile</h2>
      
      {error && <div className="error-message">{error}</div>}

      <div className="privacy-settings">
        <h3>Privacy Settings</h3>
        <div className="privacy-toggles">
          {Object.entries(privacySettings).map(([key, value]) => (
            <motion.div 
              key={key}
              className="privacy-toggle"
              whileHover={{ scale: 1.02 }}
            >
              <label>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                <motion.button
                  className={`toggle-button ${value ? 'active' : ''}`}
                  onClick={() => handlePrivacyToggle(key)}
                  whileTap={{ scale: 0.95 }}
                >
                  {value ? <FaEye /> : <FaEyeSlash />}
                </motion.button>
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="share-options">
        <div className="shareable-link">
          <input 
            type="text" 
            value={shareableLink} 
            readOnly 
          />
          <motion.button
            className={`copy-button ${copySuccess ? 'success' : ''}`}
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copySuccess ? 'Copied!' : 'Copy Link'}
          </motion.button>
        </div>

        <div className="social-share">
          <motion.button
            className="share-button linkedin"
            onClick={() => shareToSocialMedia('linkedin')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin /> Share on LinkedIn
          </motion.button>

          <motion.button
            className="share-button twitter"
            onClick={() => shareToSocialMedia('twitter')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTwitter /> Share on Twitter
          </motion.button>
        </div>

        <motion.button
          className="generate-pdf-button"
          onClick={generatePDFReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isGeneratingPDF}
        >
          <FaDownload />
          {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF Report'}
        </motion.button>
      </div>

      {profileData && (
        <div className="preview-section">
          <h3>Profile Preview</h3>
          <div className="profile-preview">
            {privacySettings.showPersonalInfo && (
              <div className="preview-card">
                <h4>Personal Information</h4>
                <p>{profileData.name}</p>
                <p>{profileData.title}</p>
              </div>
            )}
            
            {privacySettings.showEducation && (
              <div className="preview-card">
                <h4>Education</h4>
                <p>{profileData.education?.college}</p>
                <p>{profileData.education?.degree}</p>
              </div>
            )}
            
            {privacySettings.showPlatformStats && (
              <div className="preview-card">
                <h4>Platform Statistics</h4>
                {/* Add platform stats here */}
              </div>
            )}
            
            {privacySettings.showCertifications && (
              <div className="preview-card">
                <h4>Certifications</h4>
                {/* Add certifications here */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharingOptions;