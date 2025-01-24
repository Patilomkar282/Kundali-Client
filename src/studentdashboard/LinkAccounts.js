import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaHackerrank, FaCode } from 'react-icons/fa';
import '../css/LinkAccounts.css';

const LinkAccounts = () => {
  const [accounts, setAccounts] = useState({
    github: { url: '', isLinked: false, lastSynced: null },
    leetcode: { url: '', isLinked: false, lastSynced: null },
    hackerrank: { url: '', isLinked: false, lastSynced: null }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchLinkedAccounts();
  }, []);

  const fetchLinkedAccounts = async () => {
    try {
      const response = await fetch('your-api-endpoint/linked-accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      setError('Failed to fetch linked accounts');
    }
  };

  const validateUrl = (url, platform) => {
    const patterns = {
      github: /^https:\/\/github\.com\/[\w-]+$/,
      leetcode: /^https:\/\/leetcode\.com\/[\w-]+$/,
      hackerrank: /^https:\/\/www\.hackerrank\.com\/[\w-]+$/
    };

    return patterns[platform].test(url);
  };

  const handleUrlChange = (platform, url) => {
    setAccounts(prev => ({
      ...prev,
      [platform]: { ...prev[platform], url }
    }));
    setError('');
  };

  const handleLinkAccount = async (platform) => {
    setLoading(true);
    setError('');
    setSuccess('');

    const url = accounts[platform].url;

    if (!validateUrl(url, platform)) {
      setError(`Invalid ${platform} profile URL`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('your-api-endpoint/link-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          profileLink: url
        })
      });

      if (response.ok) {
        setAccounts(prev => ({
          ...prev,
          [platform]: {
            ...prev[platform],
            isLinked: true,
            lastSynced: new Date().toISOString()
          }
        }));
        setSuccess(`${platform} account linked successfully!`);
      } else {
        throw new Error(`Failed to link ${platform} account`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlinkAccount = async (platform) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`your-api-endpoint/unlink-account/${platform}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAccounts(prev => ({
          ...prev,
          [platform]: {
            url: '',
            isLinked: false,
            lastSynced: null
          }
        }));
        setSuccess(`${platform} account unlinked successfully!`);
      } else {
        throw new Error(`Failed to unlink ${platform} account`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const platformIcons = {
    github: <FaGithub />,
    leetcode: <FaCode />,
    hackerrank: <FaHackerrank />
  };

  return (
    <motion.div 
      className="link-accounts-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Link Your Accounts</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="accounts-grid">
        {Object.entries(accounts).map(([platform, data]) => (
          <motion.div 
            key={platform}
            className="account-card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="platform-icon">
              {platformIcons[platform]}
            </div>
            <h3>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
            
            {!data.isLinked ? (
              <div className="link-form">
                <input
                  type="url"
                  placeholder={`Enter your ${platform} profile URL`}
                  value={data.url}
                  onChange={(e) => handleUrlChange(platform, e.target.value)}
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkAccount(platform)}
                  disabled={loading || !data.url}
                >
                  {loading ? 'Linking...' : 'Link Account'}
                </motion.button>
              </div>
            ) : (
              <div className="linked-account">
                <p className="profile-url">{data.url}</p>
                <p className="last-synced">
                  Last synced: {new Date(data.lastSynced).toLocaleString()}
                </p>
                <div className="action-buttons">
                  <motion.button
                    className="view-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(data.url, '_blank')}
                  >
                    View Profile
                  </motion.button>
                  <motion.button
                    className="unlink-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUnlinkAccount(platform)}
                    disabled={loading}
                  >
                    Unlink
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LinkAccounts;