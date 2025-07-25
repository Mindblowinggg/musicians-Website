import React, { useState, useEffect } from "react";
import "./category.css";
import Checkbox from "../checkbox";
import { useNavigate } from "react-router-dom";
import musiciansData from "../../assets/musiciandata";

const Category = () => {
  const [selectedinstruments, setselectedinstruments] = useState([]);
  const [errormsg, seterrormsg] = useState("");

  const navigate = useNavigate();

  const handleFindClick = () => {
    if (selectedinstruments.length === 0) {
      seterrormsg("Please select instruments");
      return;
    }

    const filteredArtists = musiciansData.filter((artist) => {
      const instrumentMatch = selectedinstruments.some((selInst) => {
        return artist.instrument.includes(selInst);
      });

      return instrumentMatch;
    });

    navigate("/results", { state: { filteredArtists } });
  };

  const instrumentsList = [
    { name: "Guitar", label: "Guitar" },
    { name: "Vocal", label: "Vocal" },
    { name: "Drums", label: "Drums" },
    { name: "Keyboard", label: "Keyboard" },
    { name: "Bass", label: "Bass" },
    { name: "Violin", label: "Violin" },
  ];

  const locationsList = [
    { name: "vadodara", label: "Vadodara" },
    { name: "ahmedabad", label: "Ahmedabad" },
    { name: "mumbai", label: "Mumbai" },
    { name: "delhi", label: "Delhi" },
    { name: "bengaluru", label: "Bengaluru" },
  ];

  const handleinstrumentlist = (name, ischecked) => {
    if (ischecked) {
      setselectedinstruments([...selectedinstruments, name]);
    } else {
      setselectedinstruments(
        selectedinstruments.filter((item) => item !== name)
      );
    }
  };
  useEffect(() => {
    console.log("Selected Instruments:", selectedinstruments);
  }, [selectedinstruments]);

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
              onuserchange={handleinstrumentlist}
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
      {errormsg && <p className="errormsg"> {errormsg}</p>}
      <div className="findbtn">
        <button onClick={handleFindClick}>Find</button>
      </div>
    </div>
  );
};

export default Category;
