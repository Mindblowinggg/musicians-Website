import React from "react";
import "./category.css";
import Checkbox from "../checkbox"; // सुनिश्चित करें कि यह सही पाथ है

const Category = () => {
  const instrumentsList = [
    { name: "guitar", label: "Guitar" },
    { name: "vocal", label: "Vocal" },
    { name: "drums", label: "Drums" },
    { name: "keyboard", label: "Keyboard" },
    { name: "bass", label: "Bass" },
    { name: "violin", label: "Violin" },
  ];

  const locationsList = [
    { name: "vadodara", label: "Vadodara" },
    { name: "ahmedabad", label: "Ahmedabad" },
    { name: "mumbai", label: "Mumbai" },
    { name: "delhi", label: "Delhi" },
    { name: "bengaluru", label: "Bengaluru" },
  ];

  return (
    <div className="categorydiv">
      <div className="insidediv">
        <h2>Select Instruments</h2>
        <div className=" checkboxes">
          {instrumentsList.map((instrument) => (
            <Checkbox
              key={instrument.name}
              name={instrument.name}
              label={instrument.label}
            />
          ))}
        </div>

        <h2>Select Location</h2>
        <div className=" checkboxes">
          {locationsList.map((instrument) => (
            <Checkbox
              key={instrument.name}
              name={instrument.name}
              label={instrument.label}
            />
          ))}
        </div>
      </div>
      <div className="findbtn">
        <button>Find</button>
      </div>
    </div>
  );
};

export default Category;
