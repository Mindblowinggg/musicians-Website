import React from "react";
import Checkbox from "../checkbox"; // सुनिश्चित करें कि यह सही पाथ है

const Category = () => {
  const instrumentsList = [
    { name: 'guitar', label: 'Guitar' },
    { name: 'vocal', label: 'Vocal' },
    { name: 'drums', label: 'Drums' },
    { name: 'keyboard', label: 'Keyboard' },
    { name: 'bass', label: 'Bass' },
    { name: 'violin', label: 'Violin' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Category</h2> {/* Tailwind for heading */}

      {/* Tailwind classes for arranging checkboxes in a row */}
      <div className="flex  flex-wrap gap-3 p-6 justify-center items-center border rounded-md"> {/* flex, flex-wrap, gap, padding, border, rounded */}
        {instrumentsList.map((instrument) => (
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