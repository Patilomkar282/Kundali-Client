import React from 'react';
import { motion } from 'framer-motion';
import '../css/Services.css';

const ServiceCard = ({ title, description, icon, features }) => (
  <motion.div
    className="service-card"
    whileHover={{ y: -10 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="service-icon">{icon}</div>
    <h3>{title}</h3>
    <p className="service-description">{description}</p>
    <ul className="feature-list">
      {features.map((feature, index) => (
        <li key={index}>
          <span className="feature-icon">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <motion.button
      className="learn-more-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Learn More
    </motion.button>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      title: 'Student Module',
      description: 'Comprehensive learning and development platform for students',
      icon: '👨‍🎓',
      features: [
        'Personalized Dashboard',
        'Progress Tracking',
        'Skill Assessments',
        'Learning Paths',
        'Project Portfolio'
      ]
    },
    {
      title: 'Admin Module',
      description: 'Powerful tools for system management and monitoring',
      icon: '⚙️',
      features: [
        'User Management',
        'Analytics Dashboard',
        'System Monitoring',
        'Content Management',
        'Access Control'
      ]
    },
    {
      title: 'Recruiter Module',
      description: 'Streamlined recruitment and talent acquisition platform',
      icon: '👥',
      features: [
        'Candidate Search',
        'Job Posting',
        'Applicant Tracking',
        'Interview Scheduling',
        'Assessment Tools'
      ]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Our Services</h2>
          <p className="services-subtitle">
            Empowering users with comprehensive tools and features
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;