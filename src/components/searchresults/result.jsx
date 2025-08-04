import React from "react";
import "./results.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Results = () => {
  const location = useLocation();
  
  const { filteredArtists, searchCriteria } = location.state || {
    filteredArtists: [],
    searchCriteria: {},
  };

  const country = searchCriteria.country || "";
  const state = searchCriteria.state || "";
  const city = searchCriteria.city || "";

  return (
    <>
      <div className="result-background-fixed"></div>
      <div className="resultdiv">
        <h2>
          Searched Results{" "}
          {(country || state || city) && (
            <p className="search-location-info">
              Location: {city && `${city}, `}
              {state && `${state}, `}
              {country}
            </p>
          )}
        </h2>
        {filteredArtists.length > 0 ? (
          <ul>
            {filteredArtists.map((artist) => (
              <li key={artist.id}>
                <Link to={`/artist/${artist.id}`}>
                  <img className="pfp" src={artist.pfp} alt={artist.name} />
                  <h3 >{artist.name}</h3>
                  <p>Instrument: {artist.instrument.join(", ")}</p>
                  <p>Click For More Info</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results-message">
            No artists found matching your selection
          </p>
        )}
      </div>
    </>
  );
};

export default Results;
