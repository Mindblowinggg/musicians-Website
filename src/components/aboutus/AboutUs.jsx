// src/components/AboutUs/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Don't forget to create this CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1 className='heading'>About Dhun Dost</h1>

        <p>
          Welcome to Dhun Dost (धुन दोस्त) - your ultimate companion for connecting with musical talent! We are an innovative platform dedicated to bridging the gap between exceptional musicians and those seeking their unique skills. Whether you're planning an event, looking for a studio collaborator, or simply want to explore the vibrant world of music, Dhun Dost is here to simplify your search.
        </p>
        <p>
          Our mission is to empower artists by providing them with a prominent stage to showcase their talent, reach new audiences, and find exciting opportunities. For users, we offer a seamless and efficient way to discover verified and talented musicians across various instruments, genres, and locations.
        </p>
        <p>
          At Dhun Dost, we believe that every event deserves the perfect sound, and every musician deserves to be heard. Join our community and let us help you find your "Dhun Dost" today!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;