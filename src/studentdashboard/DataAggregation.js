import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSync, FaGithub, FaCode, FaHackerrank } from 'react-icons/fa';
import '../css/DataAggregation.css';

const DataAggregation = () => {
  const [platformData, setPlatformData] = useState({
    github: {
      repositories: 0,
      contributions: 0,
      stars: 0,
      followers: 0,
      lastSynced: null,
      isLoading: false,
      error: null
    },
    leetcode: {
      problemsSolved: 0,
      ranking: 0,
      contestRating: 0,
      badges: [],
      lastSynced: null,
      isLoading: false,
      error: null
    },
    hackerrank: {
      problemsSolved: 0,
      certificates: [],
      badges: [],
      ranking: 0,
      lastSynced: null,
      isLoading: false,
      error: null
    }
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    fetchAllPlatformData();
  }, []);

  const fetchAllPlatformData = async () => {
    try {
      const response = await fetch('your-api-endpoint/aggregated-data');
      const data = await response.json();
      setPlatformData(data);
    } catch (error) {
      setGlobalError('Failed to fetch platform data');
    }
  };

  const syncPlatformData = async (platform) => {
    setPlatformData(prev => ({
      ...prev,
      [platform]: { ...prev[platform], isLoading: true, error: null }
    }));

    try {
      const response = await fetch(`your-api-endpoint/sync/${platform}`, {
        method: 'POST'
      });
      const data = await response.json();

      setPlatformData(prev => ({
        ...prev,
        [platform]: {
          ...data,
          isLoading: false,
          lastSynced: new Date().toISOString()
        }
      }));
    } catch (error) {
      setPlatformData(prev => ({
        ...prev,
        [platform]: {
          ...prev[platform],
          isLoading: false,
          error: 'Failed to sync data'
        }
      }));
    }
  };

  const syncAllPlatforms = async () => {
    setIsSyncing(true);
    setGlobalError(null);

    try {
      await Promise.all(
        Object.keys(platformData).map(platform => syncPlatformData(platform))
      );
    } catch (error) {
      setGlobalError('Failed to sync all platforms');
    } finally {
      setIsSyncing(false);
    }
  };

  const PlatformCard = ({ platform, data, icon }) => (
    <motion.div 
      className="platform-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="platform-header">
        <div className="platform-icon">{icon}</div>
        <h3>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
        <motion.button
          className="sync-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => syncPlatformData(platform)}
          disabled={data.isLoading}
        >
          <FaSync className={data.isLoading ? 'spinning' : ''} />
        </motion.button>
      </div>

      {data.error ? (
        <div className="error-message">{data.error}</div>
      ) : (
        <div className="platform-stats">
          {platform === 'github' && (
            <>
              <div className="stat-item">
                <h4>Repositories</h4>
                <p>{data.repositories}</p>
              </div>
              <div className="stat-item">
                <h4>Contributions</h4>
                <p>{data.contributions}</p>
              </div>
              <div className="stat-item">
                <h4>Stars</h4>
                <p>{data.stars}</p>
              </div>
              <div className="stat-item">
                <h4>Followers</h4>
                <p>{data.followers}</p>
              </div>
            </>
          )}

          {platform === 'leetcode' && (
            <>
              <div className="stat-item">
                <h4>Problems Solved</h4>
                <p>{data.problemsSolved}</p>
              </div>
              <div className="stat-item">
                <h4>Ranking</h4>
                <p>{data.ranking}</p>
              </div>
              <div className="stat-item">
                <h4>Contest Rating</h4>
                <p>{data.contestRating}</p>
              </div>
              <div className="badges-container">
                <h4>Badges</h4>
                <div className="badges-grid">
                  {data.badges.map((badge, index) => (
                    <div key={index} className="badge-item">
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {platform === 'hackerrank' && (
            <>
              <div className="stat-item">
                <h4>Problems Solved</h4>
                <p>{data.problemsSolved}</p>
              </div>
              <div className="stat-item">
                <h4>Ranking</h4>
                <p>{data.ranking}</p>
              </div>
              <div className="certificates-container">
                <h4>Certificates</h4>
                <div className="certificates-grid">
                  {data.certificates.map((cert, index) => (
                    <div key={index} className="certificate-item">
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="last-synced">
            Last synced: {data.lastSynced ? new Date(data.lastSynced).toLocaleString() : 'Never'}
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="data-aggregation-container">
      <div className="header-section">
        <h2>Platform Statistics</h2>
        <motion.button
          className="sync-all-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={syncAllPlatforms}
          disabled={isSyncing}
        >
          <FaSync className={isSyncing ? 'spinning' : ''} />
          Sync All Platforms
        </motion.button>
      </div>

      {globalError && (
        <div className="global-error-message">{globalError}</div>
      )}

      <div className="platforms-grid">
        <PlatformCard 
          platform="github" 
          data={platformData.github}
          icon={<FaGithub />}
        />
        <PlatformCard 
          platform="leetcode" 
          data={platformData.leetcode}
          icon={<FaCode />}
        />
        <PlatformCard 
          platform="hackerrank" 
          data={platformData.hackerrank}
          icon={<FaHackerrank />}
        />
      </div>
    </div>
  );
};

export default DataAggregation;