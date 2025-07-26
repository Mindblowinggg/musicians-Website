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
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
      setSelectedState(null);
      setCityOptions([]);
      setSelectedCity(null);
    } else {
      setStateOptions([]);
      setSelectedState(null);
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  // NEW useEffect for Cities
  useEffect(() => {
    if (selectedState && selectedCountry) {
      const citiesOfSelectedState = City.getCitiesOfState(selectedCountry.value, selectedState.value);
      const formattedCities = citiesOfSelectedState.map(city => ({
        value: city.name,
        label: city.name
      }));
      setCityOptions(formattedCities);
      setSelectedCity(null);
    } else {
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedState, selectedCountry]);

  const handleFindClick = () => {
    if (selectedinstruments.length === 0) {
      seterrormsg("Please select instruments");
      return;
    }

    // Helper function to normalize strings for comparison
    const normalizeString = (str) => {
      if (!str) return '';
      return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    const filteredArtists = musiciansData.filter((artist) => {
      const instrumentMatch = selectedinstruments.some((selInst) => {
        return artist.instrument.includes(selInst);
      });

      const artistCountryNormalized = normalizeString(artist.country);
      const artistStateNormalized = normalizeString(artist.state);
      const artistCityNormalized = normalizeString(artist.city);

      const selectedCountryNormalized = selectedCountry ? normalizeString(selectedCountry.label) : '';
      const selectedStateNormalized = selectedState ? normalizeString(selectedState.label) : '';
      const selectedCityNormalized = selectedCity ? normalizeString(selectedCity.label) : '';

      const locationMatch =
        (!selectedCountry || artistCountryNormalized === selectedCountryNormalized) &&
        (!selectedState || artistStateNormalized === selectedStateNormalized) &&
        (!selectedCity || artistCityNormalized === selectedCityNormalized);

      return instrumentMatch && locationMatch;
    });

    // *** IMPORTANT CHANGE HERE ***
    // Pass the search criteria along with filteredArtists
    navigate("/results", {
      state: {
        filteredArtists: filteredArtists,
        searchCriteria: {
          country: selectedCountry ? selectedCountry.label : '',
          state: selectedState ? selectedState.label : '',
          city: selectedCity ? selectedCity.label : '',
        },
      },
    });
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

  useEffect(() => {
    console.log("Selected Country:", selectedCountry?.label);
    console.log("Selected State:", selectedState?.label);
    console.log("Selected City:", selectedCity?.label);
  }, [selectedCountry, selectedState, selectedCity]);

  return (
    <div className="categorydiv">
      <div className="insidediv">
        <h2>Select Instruments</h2>
        <div className="checkboxes">
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
          value={selectedCountry}
          isSearchable={true}
          isClearable={true}
        />
        {/* State Select */}
        <Select
          className="searchbar2"
          placeholder="Select State..."
          onChange={setSelectedState}
          options={stateOptions}
          value={selectedState}
          isSearchable={true}
          isClearable={true}
          isDisabled={!selectedCountry}
        />
        {/* City Select */}
        <Select
          className="searchbar3"
          placeholder="Select City..."
          onChange={setSelectedCity}
          options={cityOptions}
          value={selectedCity}
          isSearchable={true}
          isClearable={true}
          isDisabled={!selectedState}
        />
      </div>

      <div className="findbtn">
        <button onClick={handleFindClick}>Find</button>
      </div>
    </div>
  );
};

export default Category;