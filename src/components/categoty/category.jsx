import React from "react";
import "./category.css"
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
    { name: 'vadodara', label: 'Vadodara' },
    { name: 'ahmedabad', label: 'Ahmedabad' },
    { name: 'mumbai', label: 'Mumbai' },
    { name: 'delhi', label: 'Delhi' },
    { name: 'bengaluru', label: 'Bengaluru' },
  ];

  return (
    <div className="categorydiv">
      <h2 className="text-xl font-bold mb-4 text-center">Find Musicians</h2>

      <h2>Select Instruments</h2>
      <div className="flex  flex-wrap gap-3 p-6 justify-center items-center border rounded-md">
        {instrumentsList.map((instrument) => (
          <Checkbox
            key={instrument.name}
            name={instrument.name}
            label={instrument.label}
          />
        ))}
      </div>

      <h2 className="mt-5">Select Location</h2>
      <div className="flex flex-wrap gap-3 p-6 justify-center items-center border rounded-md">
        {locationsList.map((instrument) => (
          <Checkbox
            key={instrument.name}
            name={instrument.name}
            label={instrument.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
