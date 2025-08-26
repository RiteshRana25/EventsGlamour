import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

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

        <p>Phone</p>
        <p>📞 0524460569</p>
        <p>Email</p>
        <p>✉️ info@eventsglamour.com</p>
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
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon facebook"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.linkedin.com/company/events-glamour/"
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
