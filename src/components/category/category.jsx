import React, { useState, useEffect } from "react";
import "./category.css";
import Checkbox from "../checkbox";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../../firebase'; // Correct path to your firebase config

const Category = () => {
  const [selectedinstruments, setselectedinstruments] = useState([]);
  const [errormsg, seterrormsg] = useState("");
  const [musiciansData, setMusiciansData] = useState([]); // State to store data from Firebase
  const [loading, setLoading] = useState(true); // State to handle loading status

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

  // New useEffect to fetch musicians data from Firebase Firestore
  useEffect(() => {
    const fetchMusicians = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "musicians"));
        const fetchedMusicians = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMusiciansData(fetchedMusicians);
        setLoading(false); // Set loading to false after data is fetched
        console.log("Fetched musicians data from Firebase:", fetchedMusicians);
      } catch (e) {
        console.error("Error fetching documents: ", e);
        setLoading(false); // Also set to false on error
      }
    };

    fetchMusicians();
  }, []); // Empty dependency array means this runs only once on component mount

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
    seterrormsg(""); // Clear error message

    const normalizeString = (str) => {
      if (!str) return '';
      return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    // Filter the data fetched from Firebase instead of local file
    const filteredArtists = musiciansData.filter((artist) => {
      const instrumentMatch = selectedinstruments.some((selInst) => {
        // artist.instrument is now an array from Firebase
        return artist.instrument.includes(selInst);
      });

      const artistCountryNormalized = normalizeString(artist.country);
      const artistStateNormalized = normalizeString(artist.state);
      const artistCityNormalized = normalizeString(artist.city);

      const selectedCountryNormalized = selectedCountry ? normalizeString(selectedCountry.label) : '';
      const selectedStateNormalized = selectedState ? normalizeString(selectedState.label) : '';
      const selectedCityNormalized = selectedCity ? normalizeString(selectedCity.label) : '';

      const locationMatch =
        (!selectedCountry || artistCountryNormalized.includes(selectedCountryNormalized)) &&
        (!selectedState || artistStateNormalized.includes(selectedStateNormalized)) &&
        (!selectedCity || artistCityNormalized.includes(selectedCityNormalized));

      return instrumentMatch && locationMatch;
    });

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

  if (loading) {
    return (
      <div className="categorydiv">
        <h2>Loading artists...</h2>
      </div>
    );
  }

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
        <Select
          className="searchbar"
          placeholder="Select Country..."
          onChange={setSelectedCountry}
          options={countryOptions}
          value={selectedCountry}
          isSearchable={true}
          isClearable={true}
        />
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
