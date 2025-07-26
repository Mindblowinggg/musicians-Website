import React from "react";
import "./results.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Results = () => {
  const location = useLocation();
  const { filteredArtists } = location.state || { filteredArtists: [] };

  return (
    <>
      {/* This new div will hold your fixed background */}
      <div className="result-background-fixed"></div>

      {/* Your existing content div */}
      <div className="resultdiv">
        <h2>Searched Results</h2>
        {filteredArtists.length > 0 ? (
          <ul>
            {filteredArtists.map((artist) => (
              <li key={artist.id}>
                <Link
                  to={`/artist/${artist.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>{artist.name}</h3>
                  <p>Instrument: {artist.instrument.join(", ")}</p>
                  <img
                    src={artist.pfp}
                    alt={artist.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white z-20 text-xl text-center pt-30 ">
            No artists found matching your selection
          </p>
        )}
      </div>
    </>
  );
};

export default Results;
