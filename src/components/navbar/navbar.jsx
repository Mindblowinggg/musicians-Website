import React, { useState } from "react";
import { MdQueueMusic, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Application Logo/Title */}
      <div className="navlogo">
        <NavLink to="/" className="nav-title-link">
          <h1>Dhun Dost</h1>
        </NavLink>
      </div>

      {/* Desktop Navlinks */}
      <div className="desktop-navlinks">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/BrowseArtists"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Browse Artists
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register-musician"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Register as Musician
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Menu Icon for Mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? (
          <MdClose size={40} className="close-icon" />
        ) : (
          <MdQueueMusic size={40} className="open-icon" />
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <NavLink
              to="/"
              exact
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/BrowseArtists"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={toggleMenu}
            >
              Browse Artists
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={toggleMenu}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={toggleMenu}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/register-musician"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={toggleMenu}
            >
              Register as Musician
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
