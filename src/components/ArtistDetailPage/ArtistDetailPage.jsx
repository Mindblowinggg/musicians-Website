// ArtistDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming your firebase config is here
import './ArtistDetailPage.css';

function ArtistDetailPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const docRef = doc(db, "musicians", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArtist(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching artist: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtist();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading artist details...</div>;
  }

  if (!artist) {
    return <h2 className="artist-not-found">Artist not found!</h2>;
  }

  const experiencedParagraphs = artist.experiencedDescription 
    ? artist.experiencedDescription.split('\n').filter(p => p.trim() !== '') 
    : [];

  return (
    <div className="artist-detail-page-container">
      {/* Artist Profile Card */}
      <div className="artist-card">
        <h1>{artist.name}</h1>
        <img src={artist.pfp} alt={artist.name} className="artist-pfp" />
        <p><strong>Instrument:</strong> {artist.instrument ? artist.instrument.join(', ') : 'N/A'}</p>
        <p><strong>Country:</strong> {artist.country}</p>
        <p><strong>State:</strong> {artist.state}</p>
        <p><strong>City:</strong> {artist.city}</p>
        <p><strong>Experience:</strong> {artist.experience}</p>
        <p><strong>Genre:</strong> {artist.genre ? artist.genre.join(', ') : 'N/A'}</p>
        <p><strong>Contact:</strong> {artist.contact}</p>
      </div>

      {/* Experienced Description Section */}
      <div className="content-section">
        <h2>An Experienced Artist</h2>
        {experiencedParagraphs.length > 0 ? (
          experiencedParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        ) : (
          <p>No experienced description available.</p>
        )}
      </div>
    </div>
  );
}

export default ArtistDetailPage;