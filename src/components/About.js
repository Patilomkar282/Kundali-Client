import React from 'react';
import { motion } from 'framer-motion';
import '../css/About.css';

const About = () => {
  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Recruiters' },
    { number: '95%', label: 'Success Rate' },
    { number: '50+', label: 'Partner Companies' }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      quote: 'Building the future of tech recruitment'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      quote: 'Innovating through technology'
    },
    {
      name: 'Emma Williams',
      role: 'Head of Operations',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      quote: 'Streamlining processes for success'
    }
  ];

  const achievements = [
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Successfully launched with 1000+ early adopters',
      icon: '🚀'
    },
    {
      year: '2024',
      title: 'Market Expansion',
      description: 'Expanded to 15 countries worldwide',
      icon: '🌍'
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description: 'Awarded "Best Tech Innovation" by TechWorld',
      icon: '🏆'
    },
    {
      year: '2025',
      title: 'AI Integration',
      description: 'Launched AI-powered matching algorithm',
      icon: '🤖'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Hero Section */}
        <motion.div
          className="about-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>About Kundali</h1>
          <p className="hero-subtitle">
            Bridging the gap between talent and opportunity in the tech industry
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          className="mission-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Kundali, we're committed to revolutionizing the tech recruitment landscape
              by creating a seamless bridge between talented developers and industry
              opportunities. Our platform leverages cutting-edge technology to provide
              personalized experiences for students, recruiters, and administrators alike.
            </p>
          </div>
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We envision a future where every tech professional has access to opportunities
              that perfectly match their skills and aspirations. Through innovation and
              dedication, we're building a platform that makes this vision a reality.
            </p>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="timeline-icon">{achievement.icon}</div>
                <div className="timeline-content">
                  <span className="year">{achievement.year}</span>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="quote">"{member.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <motion.div className="value-card">
              <span className="value-icon">💡</span>
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries and embracing new technologies</p>
            </motion.div>
            <motion.div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>Collaboration</h3>
              <p>Building strong partnerships and fostering community growth</p>
            </motion.div>
            <motion.div className="value-card">
              <span className="value-icon">⚖️</span>
              <h3>Integrity</h3>
              <p>Maintaining transparency and ethical practices in all operations</p>
            </motion.div>
            <motion.div className="value-card">
              <span className="value-icon">🎯</span>
              <h3>Excellence</h3>
              <p>Striving for the highest quality in everything we do</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;