import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaUser, 
  FaLink, 
  FaChartBar, 
  FaShare, 
  FaBars, 
  FaSignOutAlt 
} from 'react-icons/fa';
import '../css/Dashboard.css';

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/student/dashboard', icon: <FaHome />, title: 'Dashboard' },
    { path: '/student/profile', icon: <FaUser />, title: 'Profile' },
    { path: '/student/link-accounts', icon: <FaLink />, title: 'Link Accounts' },
    { path: '/student/progress', icon: <FaChartBar />, title: 'Progress' },
    { path: '/student/share', icon: <FaShare />, title: 'Share' }
  ];

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-layout">
      <motion.div 
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        animate={{ width: isSidebarOpen ? '250px' : '60px' }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <motion.h2
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            TalentConnect
          </motion.h2>
          <button 
            className="toggle-button"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    className="title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        <button className="sign-out-button" onClick={handleSignOut}>
          <span className="icon"><FaSignOutAlt /></span>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className="title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {children}
      </main>
    </div>
  );
};

export default Dashboard;