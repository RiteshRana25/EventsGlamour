import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaLinkedin,FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section logo-section">
        <img
          style={{ color: "white" }}
          src="/logo-modified.jpg"
          alt="Logo"
          className="footer-logo"
        />
      </div>

<div className="footer-section contact-section">
  <div className="contact-item">
    <h3>Phone</h3>
    <FaPhone style={{ marginRight: '8px' }} />
    <a className="phoneemail" href="tel:+971524460569">+971524460569</a>
  </div>

  <div className="contact-item">
    <h3>Email</h3>
    <FaEnvelope style={{ marginRight: '8px' }} />
    <a className="phoneemail" href="mailto:info@eventsglamour.com">info@eventsglamour.com</a>
  </div>
</div>


      <div className="footer-section social-section">
        <a
          href="https://www.instagram.com/eventsglamour.ae/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/share/17ridaj5R2/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.linkedin.com/in/events-glamour-a49a42384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon linkedin"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
