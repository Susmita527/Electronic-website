import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import "../src/Styles/footer.css"
import { Link,} from 'react-router-dom';

function Footer() {
  return (
      <footer className="footer">
      <div className="footer-container">
        
        {/* Connect With Us */}
        <div className="footer-section">
          <h3>CONNECT WITH US</h3>
          <div className="subscribe">
            <input type="email" placeholder="Enter Email ID" />
            <button>→</button>
          </div>
          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaTwitter />
          </div>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>About Electronic</li>
            <li>Help & Support</li>
            <li>FAQs</li>
            {/* <li>Buying Guide</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Careers at Croma</li> */}
          </ul>
        </div>

        {/* Products */}
        <div className="footer-section">
          <h3>PRODUCTS</h3>
          <ul>
          <Link> <li>Televisions </li></Link>
            <li>Home Appliances</li>
            <li>Phones</li>
            <li>Computers</li>
            <li>Tablets</li>
            <li>Audio & Video</li>
            <li>Laptops</li>
          </ul>
        </div>
     </div> {/* </div> */}

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© Copyright 2025 Electronic. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer
