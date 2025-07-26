import React, { useState } from "react";
import { MdQueueMusic, MdClose } from "react-icons/md"; // Import both icons
import { Link } from "react-router-dom"; // Import Link for navigation
import "./navbar.css"; // Ensure your CSS file is correctly linked

const Navbar = () => {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Application Logo/Title */}
      <div className="navlogo">
        {/* Link to home page */}
        <Link to="/" className="nav-title-link">
          <h1>Dhun Dost</h1>
        </Link>
      </div>

      {/* Menu Icon - Always visible to toggle the menu */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? (
          // Show close icon when menu is open
          <MdClose size={40} className="close-icon" />
        ) : (
          // Show music queue icon when menu is closed
          <MdQueueMusic size={40} className="open-icon" />
        )}
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">

            {/* Navigation links within the mobile menu */}
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
            <Link to="/artists" className="mobile-nav-link" onClick={toggleMenu}>Browse Artists</Link>
            <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={toggleMenu}>Contact Us</Link>
            <Link to="/register-musician" className="mobile-nav-link" onClick={toggleMenu}>Register as Musician</Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
