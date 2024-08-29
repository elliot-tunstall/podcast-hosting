import React from 'react';

function PodcastPlayer({ podcast }) {
  return (
    <div className="podcast-player">
      <h2>{podcast.title}</h2>
      <audio controls>
        <source src={podcast.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default PodcastPlayer;