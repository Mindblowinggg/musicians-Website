import React from "react";
import "./hero.css";

export const Hero = () => {
  return (
    <div className="main">
    <img src="/herotext.png" alt="" />
    <p>Are you an artist?</p>
   <button className="btn"><i className="animation"></i>Find Musicians<i className="animation"></i>
    </button>
    </div>
  );
};

export default Hero;
