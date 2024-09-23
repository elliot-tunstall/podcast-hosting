import React from 'react';
import '../pages/Podcasts.css';

function PodcastPlayer({ podcast }) {
  // Appends autoplay parameter to embedUrl
  const autoplayUrl = `${podcast.embedUrl}&autoplay=1`;

  return (
    <div className="podcast-player">
      <iframe 
        style={{ borderRadius: '12px' }} 
        src={autoplayUrl} 
        width="100%" 
        height="80px" 
        allowFullScreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        title={`Listen to ${podcast.title}`}
      ></iframe>
      </div>
    );
  }

export default PodcastPlayer;