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
        <h2>Searched Results</h2>
        {filteredArtists.length > 0 ? (
          <ul>
            {filteredArtists.map((artist) => (
              <li key={artist.id}>
                <div className='pfp'><img className='rounded-4xl' src={artist.pfp} alt="" /></div>
                <h3>{artist.name}</h3>
                <p><span>Instruments: </span> {artist.instrument.join(', ')}</p>
                <p><span>Country:</span>{artist.country}</p>
                 <p><span>State:</span>{artist.state}</p>
                  <p><span>City:</span>{artist.city}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-white z-20 text-xl text-center pt-30 '>No artists found matching your selection</p>
        )}
      </div>
    </>
  );
};

export default Results;