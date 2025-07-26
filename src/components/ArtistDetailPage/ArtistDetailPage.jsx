// ArtistDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import musiciansData from "../../assets/musiciandata";
import './ArtistDetailPage.css'; // Import the CSS file

function ArtistDetailPage() {
  const { id } = useParams();
  const artist = musiciansData.find(musician => musician.id === parseInt(id));

  if (!artist) {
    return <h2 className="artist-not-found">Artist not found!</h2>;
  }

  // Split description paragraphs if they are stored as single strings
  // Or store them as arrays of strings in musiciansData if you prefer
  const experiencedParagraphs = artist.experiencedDescription.split('\n').filter(p => p.trim() !== '');
  const readyToHelpParagraphs = artist.readyToHelpDescription.split('\n').filter(p => p.trim() !== '');


  return (
    <div className="artist-detail-page-container">
      {/* Artist Profile Card */}
      <div className="artist-card">
        <h1>{artist.name}</h1>
        <img src={artist.pfp} alt={artist.name} className="artist-pfp" />
        <p><strong>Instrument:</strong> {artist.instrument.join(', ')}</p>
        <p><strong>Country:</strong> {artist.country}</p>
        <p><strong>State:</strong> {artist.state}</p>
        <p><strong>City:</strong> {artist.city}</p>
        <p><strong>Experience:</strong> {artist.experience}</p>
        <p><strong>Genre:</strong> {artist.genre}</p>
        <p><strong>Contact:</strong> {artist.contact}</p>
      </div>

      {/* Experienced Description Section */}
      <div className="content-section">
        <h2>An Experienced Artist</h2>
        {experiencedParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Ready to Help Section */}
      <div className="content-section">
        <h2>Ready to help you!</h2>
        {readyToHelpParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* My Performance Videos Section (assuming video links would be in musiciansData too) */}
      <div className="content-section">
        <h2>My Performance Videos</h2>
        <div className="video-grid">
          {/* You would add a 'videos' array to your musicianData and map through it here */}
          {/* For example: */}
          {/* {artist.videos && artist.videos.map((videoUrl, index) => (
            <div key={index} className="video-placeholder">
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Performance Video ${index + 1}`}
              ></iframe>
            </div>
          ))} */}
          {/* If no videos in data, show placeholders or a message */}
          {!artist.videos || artist.videos.length === 0 ? (
            <>
              <div className="video-placeholder">Video 1</div>
              <div className="video-placeholder">Video 2</div>
              <div className="video-placeholder">Video 3</div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetailPage;