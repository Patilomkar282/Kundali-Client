import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-brand">
              <h3 className="footer-logo">Kundali</h3>
              <p className="company-description">
                Empowering tech talent through innovative solutions and comprehensive career development tools.
              </p>
            </div>
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt"></i> 123 Tech Street, Silicon Valley, CA 94025</p>
              <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
              <p><i className="fas fa-envelope"></i> contact@kundali.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#hero" onClick={(e) => scrollToSection('hero', e)}>Home</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection('services', e)}>Services</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection('about', e)}>About Us</a></li>
              <li><a href="#signup" onClick={(e) => scrollToSection('signup', e)}>Sign Up</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Student Portal</a></li>
              <li><a href="#services">Recruiter Dashboard</a></li>
              <li><a href="#services">Admin Console</a></li>
              <li><a href="#services">Career Resources</a></li>
              <li><a href="#services">Skill Assessment</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Footer Sections */}
        <div className="footer-middle">
          <div className="awards-section">
            <h4>Recognition & Awards</h4>
            <div className="awards-grid">
              <div className="award-item">
                <i className="fas fa-award"></i>
                <span>Best Tech Startup 2024</span>
              </div>
              <div className="award-item">
                <i className="fas fa-trophy"></i>
                <span>Innovation Excellence</span>
              </div>
              <div className="award-item">
                <i className="fas fa-medal"></i>
                <span>Top Recruiter Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Kundali. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;