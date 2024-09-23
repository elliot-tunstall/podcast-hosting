import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { WEBSITE_NAME } from '../data/websiteConfig';
import microphone from '../images/microphoneAnimation.webm'

function Header() {
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; // Set playback speed to half
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className='center-element'>
            <video ref={videoRef} width="60" height="60" autoPlay muted
            onMouseEnter={() => videoRef.current.play()} // Play on hover
            >
              <source src={microphone} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <Link to="/" className="logo">{ WEBSITE_NAME }</Link>
          </div>
          <nav className="nav-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/podcasts">Podcasts</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;