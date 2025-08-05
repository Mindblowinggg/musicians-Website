import React, { useState, useEffect } from 'react';
import './RegisterMusician.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

const RegisterMusician = () => {
  const [formData, setFormData] = useState({
    name: '',
    instrument: [],
    experience: '',
    genre: [],
    contact: '',
    experiencedDescription: '',
  });

  const [uploading, setUploading] = useState(false);

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const instrumentsList = [
    { value: 'Guitar', label: 'Guitar' },
    { value: 'Vocal', label: 'Vocal' },
    { value: 'Drums', label: 'Drums' },
    { value: 'Keyboard', label: 'Keyboard' },
    { value: 'Bass', label: 'Bass' },
    { value: 'Violin', label: 'Violin' },
    { value: 'Flute', label: 'Flute' },
    { value: 'Saxophone', label: 'Saxophone' },
    { value: 'Tabla', label: 'Tabla' },
    { value: 'Sitar', label: 'Sitar' },
    { value: 'Harmonium', label: 'Harmonium' },
  ];

  const genreList = [
    { value: 'Rock', label: 'Rock' },
    { value: 'Pop', label: 'Pop' },
    { value: 'Bollywood', label: 'Bollywood' },
    { value: 'Indie', label: 'Indie' },
    { value: 'Classical', label: 'Classical' },
    { value: 'Jazz', label: 'Jazz' },
    { value: 'Metal', label: 'Metal' },
    { value: 'Hip Hop', label: 'Hip Hop' },
    { value: 'Electronic', label: 'Electronic' },
  ];

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const formattedCountries = allCountries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(formattedCountries);
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInstrumentChange = (selectedOptions) => {
    const instruments = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prevState => ({
      ...prevState,
      instrument: instruments,
    }));
  };

  const handleGenreChange = (selectedOptions) => {
    const genres = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prevState => ({
      ...prevState,
      genre: genres,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // Common URL for all profile pictures
    const pfpUrl = 'https://firebasestorage.googleapis.com/v0/b/musicians-website-9c78b.firebasestorage.app/o/profile_pictures%2Fdefault.jpg?alt=media';

    try {
      await addDoc(collection(db, "musicians"), {
        name: formData.name,
        instrument: formData.instrument,
        country: selectedCountry ? selectedCountry.label : '',
        state: selectedState ? selectedState.label : '',
        city: selectedCity ? selectedCity.label : '',
        experience: formData.experience,
        genre: formData.genre,
        contact: formData.contact,
        pfp: pfpUrl, // Using the common URL here
        experiencedDescription: formData.experiencedDescription,
      });

      alert('Registration Successful!');

      setFormData({
        name: '', instrument: [], experience: '', genre: [],
        contact: '', experiencedDescription: '',
      });
      setSelectedCountry(null);
      setSelectedState(null);
      setSelectedCity(null);

    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Registration failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="register-musician-container">
      <h1 className="register-title">Register as a Musician</h1>
      <p className="register-subtitle">
        Please provide all the details to complete your profile.
      </p>

      <form className="musician-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="instrument">Instrument(s)</label>
          <Select
            id="instrument"
            name="instrument"
            options={instrumentsList}
            isMulti
            value={instrumentsList.filter(option => formData.instrument.includes(option.value))}
            onChange={handleInstrumentChange}
            placeholder="Select instruments..."
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <Select
            id="country"
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select Country..."
            onChange={setSelectedCountry}
            options={countryOptions}
            value={selectedCountry}
            isSearchable={true}
            isClearable={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <Select
            id="state"
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select State..."
            onChange={setSelectedState}
            options={stateOptions}
            value={selectedState}
            isSearchable={true}
            isClearable={true}
            isDisabled={!selectedCountry}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <Select
            id="city"
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select City..."
            onChange={setSelectedCity}
            options={cityOptions}
            value={selectedCity}
            isSearchable={true}
            isClearable={true}
            isDisabled={!selectedState}
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5 years" required />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre(s)</label>
          <Select
            id="genre"
            name="genre"
            options={genreList}
            isMulti
            value={genreList.filter(option => formData.genre.includes(option.value))}
            onChange={handleGenreChange}
            placeholder="Select genres..."
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Email</label>
          <input type="email" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="experiencedDescription">Experienced Description</label>
          <textarea id="experiencedDescription" name="experiencedDescription" value={formData.experiencedDescription} onChange={handleChange} rows="4" required></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={uploading}>
          {uploading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterMusician;