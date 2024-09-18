import React from 'react';
import { Link } from 'react-router-dom';
import './whereToListen.css';
import spotifyLogo from '../images/spotify-podcasts-logo-3.webp';
import applePodcastsLogo from '../images/apple-podcasts-logo-3.webp';

function WhereToListen() {
  return (
      <div className="border-container">
        <div className="item-list">
          <div className="item-list-content">
            <img src={spotifyLogo} alt="Spotify" className="logo-image"/>
            <img src={applePodcastsLogo} alt="Apple Podcasts" className="logo-image"/>
          </div>
        </div>
      </div>
      
  );
}

export default WhereToListen;
