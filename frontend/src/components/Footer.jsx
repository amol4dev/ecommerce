import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css'; // We will create this CSS file next

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-wordmark">
            <span className="footer-wm-main">TriveniSangam</span>
            <span className="footer-wm-sub">Dialogues</span>
          </div>
          <p className="footer-tagline">
            Bringing the timeless essence of Indian spirituality and Sanatan traditions into your everyday life.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-link-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-link-list">
            <li><Link to="/return">Return Policy</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Triveni Sangam Dialogues. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
