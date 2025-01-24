import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import ProfileManagement from './studentdashboard/ProfileManagement';
import LinkAccounts from './studentdashboard/LinkAccounts';
import DataAggregation from './studentdashboard/DataAggregation';
import Dashboard from './studentdashboard/Dashboard';
import ProgressDashboard from './studentdashboard/ProgressDashboard';
import SharingOptions from './studentdashboard/SharingOptions';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ... other imports ...


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Signup />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        

        {/* Student Dashboard Routes */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Dashboard>
              <Routes>
                <Route path="profile" element={<ProfileManagement />} />
                <Route path="link-accounts" element={<LinkAccounts />} />
                <Route path="progress" element={<ProgressDashboard />} />
                <Route path="share" element={<SharingOptions />} />
                
                <Route index element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Dashboard>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}


export default App;