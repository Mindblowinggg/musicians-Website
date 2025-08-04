import React, { useState } from "react";
import "./BrowseArtists.css"; // Apni CSS file ke liye
import { artistsData } from "../../assets/musiciandata";

const BrowseArtists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredArtists = artistsData.filter((artist) => {
    const genreMatch =
      selectedGenre === "All" || artist.genre === selectedGenre;
    const nameMatch = artist.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return genreMatch && nameMatch;
  });

  const allGenres = [
    "All",
    ...new Set(artistsData.map((artist) => artist.genre)),
  ];

  return (
    <div className="browse-artists-container">
      <h1 className="page-title">Browse Artists</h1>

      {/* Search Bar */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-select"
        >
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Artist Cards Grid */}
      <div className="artists-grid">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p>{artist.genre}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No artists found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseArtists;
