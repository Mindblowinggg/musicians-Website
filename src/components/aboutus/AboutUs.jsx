// src/components/AboutUs/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Don't forget to create this CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1 className='heading'>About Dhun Dost</h1>

       
        <p>
          Welcome to Dhun Dost - your ultimate companion for finding musicians in your local area! Our platform is specifically designed to connect you easily with **instrument players and vocalists who can fulfill your musical needs. Whether you're looking for musicians for an event, seeking collaborators for a project, or simply want to discover local musical talent, Dhun Dost simplifies your search.
        </p>
        <p>
          Our mission is to empower artists by providing them with a prominent stage to showcase their talent, reach new audiences, and find exciting opportunities right in their vicinity. For users, we offer a seamless and efficient way to discover verified and talented musicians across various instruments, genres, and locations nearest to you.
        </p>
        <p>
          At Dhun Dost, we believe that every event deserves the perfect musician, and every musician deserves access to opportunities nearby. Join our community and let us help you find your "Dhun Dost" today!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;