import React, { useState, useEffect } from "react";
import "./category.css";
import Checkbox from "../checkbox";
import { useNavigate } from "react-router-dom";
import musiciansData from "../../assets/musiciandata";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const Category = () => {
  const [selectedinstruments, setselectedinstruments] = useState([]);
  const [errormsg, seterrormsg] = useState("");

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]); // Changed to stateOptions for consistency
  const [cityOptions, setCityOptions] = useState([]);   // Changed to cityOptions for consistency

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null); // Changed to selectedState for consistency
  const [selectedCity, setSelectedCity] = useState(null);   // Changed to selectedCity for consistency

  const navigate = useNavigate();

  // Effect to load all countries on component mount
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const formattedCountries = allCountries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(formattedCountries);
  }, []);

  // Effect to load states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const statesOfSelectedCountry = State.getStatesOfCountry(selectedCountry.value);
      const formattedStates = statesOfSelectedCountry.map(state => ({
        value: state.isoCode,
        label: state.name
      }));
      setStateOptions(formattedStates);
      setSelectedState(null); // Reset selected state when country changes
      setCityOptions([]);     // Clear city options
      setSelectedCity(null);  // Reset selected city
    } else {
      setStateOptions([]);
      setSelectedState(null);
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  // NEW useEffect for Cities - this was missing in your provided code
  useEffect(() => {
    if (selectedState && selectedCountry) { // Need both country and state to get cities
      const citiesOfSelectedState = City.getCitiesOfState(selectedCountry.value, selectedState.value);
      const formattedCities = citiesOfSelectedState.map(city => ({
        value: city.name, // Use city name or a unique ID if available
        label: city.name
      }));
      setCityOptions(formattedCities);
      setSelectedCity(null); // Reset selected city when state changes
    } else {
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedState, selectedCountry]); // Depends on both selectedState and selectedCountry

  const handleFindClick = () => {
    if (selectedinstruments.length === 0) {
      seterrormsg("Please select instruments");
      return;
    }

    const filteredArtists = musiciansData.filter((artist) => {
      const instrumentMatch = selectedinstruments.some((selInst) => {
        return artist.instrument.includes(selInst);
      });

      // Add location filtering if needed
      // Make sure your musiciansData has 'country', 'state', 'city' properties
      // and they match the 'label' from the selected options.
      const locationMatch =
        (!selectedCountry || artist.country === selectedCountry.label) &&
        (!selectedState || artist.state === selectedState.label) &&
        (!selectedCity || artist.city === selectedCity.label);

      return instrumentMatch && locationMatch; // Combine instrument and location filters
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

  // Optional: Log selected location for debugging
  useEffect(() => {
    console.log("Selected Country:", selectedCountry?.label);
    console.log("Selected State:", selectedState?.label);
    console.log("Selected City:", selectedCity?.label);
  }, [selectedCountry, selectedState, selectedCity]);


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

        {errormsg && <p className="errormsg"> {errormsg}</p>}

        <h2>Select Location</h2>
        {/* Country Select */}
        <Select
          className="searchbar"
          placeholder="Select Country..."
          onChange={setSelectedCountry}
          options={countryOptions}
          value={selectedCountry} // Bind value
          isSearchable={true}
          isClearable={true}
          // isMulti // Keep this if you want multiple countries to be selected
        />
        {/* State Select */}
        <Select
          className="searchbar2"
          placeholder="Select State..."
          onChange={setSelectedState} // *** CORRECTED: Use setSelectedState ***
          options={stateOptions}       // *** CORRECTED: Use stateOptions ***
          value={selectedState}        // *** CORRECTED: Bind selectedState ***
          isSearchable={true}
          isClearable={true}
          isDisabled={!selectedCountry} // Disable if no country is selected
          // isMulti // Keep this if you want multiple states to be selected
        />
        {/* City Select */}
        <Select
          className="searchbar3"
          placeholder="Select City..."
          onChange={setSelectedCity}   // *** CORRECTED: Use setSelectedCity ***
          options={cityOptions}        // *** CORRECTED: Use cityOptions ***
          value={selectedCity}         // *** CORRECTED: Bind selectedCity ***
          isSearchable={true}
          isClearable={true}
          isDisabled={!selectedState}  // Disable if no state is selected
          // isMulti // Keep this if you want multiple cities to be selected
        />
      </div>

      <div className="findbtn">
        <button onClick={handleFindClick}>Find</button>
      </div>
    </div>
  );
};

export default Category;