// ArtistDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import musiciansData from "../../assets/musiciandata";

function ArtistDetailPage() {
  const { id } = useParams(); // Get the 'id' from the URL parameter
  const artist = musiciansData.find(musician => musician.id === parseInt(id)); // Find the artist

  if (!artist) {
    return <h2>Artist not found!</h2>;
  }

  return (
    <div>
      <h1>{artist.name}</h1>
      <img src={artist.pfp} alt={artist.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
      <p><strong>Instrument:</strong> {artist.instrument.join(', ')}</p>
      <p><strong>Country:</strong> {artist.country}</p>
      <p><strong>State:</strong> {artist.state}</p>
      <p><strong>City:</strong> {artist.city}</p>
      <p><strong>Experience:</strong> {artist.experience}</p>
      <p><strong>Genre:</strong> {artist.genre}</p>
      <p><strong>Contact:</strong> {artist.contact}</p>
    </div>
  );
}

export default ArtistDetailPage;