import React from "react";
import "./navbar.css";
import { MdQueueMusic } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navlogo">
        <h1>Dhun Dost</h1>
      </div>
      <div className="menuicon">
        <MdQueueMusic size={40} />
      </div>
    </div>
  );
};

export default Navbar;
