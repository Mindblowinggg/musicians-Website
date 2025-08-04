import React, { useState } from 'react';
import './RegisterMusician.css';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

const RegisterMusician = () => {
  const [formData, setFormData] = useState({
    name: '',
    instrument: '',
    country: '',
    state: '',
    city: '',
    experience: '',
    genre: '',
    contact: '',
    pfp: '',
    experiencedDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const docRef = await addDoc(collection(db, "musicians"), {
        name: formData.name,
        instrument: formData.instrument.split(',').map(item => item.trim()),
        country: formData.country,
        state: formData.state,
        city: formData.city,
        experience: formData.experience,
        genre: formData.genre,
        contact: formData.contact,
        pfp: formData.pfp,
        experiencedDescription: formData.experiencedDescription,
      });

      console.log("Document written with ID: ", docRef.id);
      alert('Registration Successful!');
      
      // Form ko reset karein
      setFormData({
        name: '', instrument: '', country: '', state: '', city: '', experience: '', genre: '',
        contact: '', pfp: '', experiencedDescription: '',
      });

    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Registration failed. Please try again.');
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
          <label htmlFor="instrument">Instrument(s) <small>(Comma-separated)</small></label>
          <input type="text" id="instrument" name="instrument" value={formData.instrument} onChange={handleChange} placeholder="e.g., Vocal, Guitar, Piano" required />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5 years" required />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre(s) <small>(Comma-separated)</small></label>
          <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} placeholder="e.g., Rock, Bollywood, Indie" required />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Email</label>
          <input type="email" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="pfp">Profile Picture URL</label>
          <input type="url" id="pfp" name="pfp" value={formData.pfp} onChange={handleChange} placeholder="e.g., https://example.com/pfp.jpg" required />
        </div>

        <div className="form-group">
          <label htmlFor="experiencedDescription">Experienced Description</label>
          <textarea id="experiencedDescription" name="experiencedDescription" value={formData.experiencedDescription} onChange={handleChange} rows="4" required></textarea>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterMusician;