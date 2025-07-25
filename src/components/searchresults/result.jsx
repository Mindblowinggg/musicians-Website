import React from 'react';
import "./results.css"
import { useLocation } from 'react-router-dom';

export const Results = () => {
  const location = useLocation();
  const { filteredArtists } = location.state || { filteredArtists: [] };

  return (
    <>
      {/* This new div will hold your fixed background */}
      <div className="result-background-fixed"></div>

      {/* Your existing content div */}
      <div className='resultdiv'>
        <h2>Search Results</h2>
        {filteredArtists.length > 0 ? (
          <ul>
            {filteredArtists.map((artist) => (
              <li key={artist.id}>
                <h3>{artist.name}</h3>
                <p>Instruments: {artist.instrument.join(', ')}</p>
                {/* Add more artist details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No artists found matching your selection.</p>
        )}
      </div>
    </>
  );
};

export default Results;