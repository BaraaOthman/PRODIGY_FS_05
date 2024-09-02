import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <div className="footer">
            <h2>Stay Connected</h2>
            <p>Thank you for visiting our site! If you have any questions or need assistance, feel free to reach out to us.</p>
            
            <div className="contact-info">
                <p><a href="mailto:support@example.com">EchoSocial12@gamil.com</a></p>
                <p><a href="tel:+1234567890">+ (961) 70 456 368</a></p>
            </div>
            
            <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook"><FaFacebookF /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram"><FaInstagram /></a>
            </div>
        </div>
    );
}

export default Footer;
