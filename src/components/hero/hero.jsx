import React from "react";
import "./hero.css";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="main">
      <img src="/herotext.png" alt="" />
      <p>Are you an artist?</p>
      
      <Link to="/category" className="btn">
        <i>Find Musicians</i>
      </Link>
      
    </div>
  );
};

export default Hero;
