import React from 'react';
import { Link } from 'react-router-dom';
import './PodcastPanel.css';
import { podcasts } from '../data/podcastData';
import { tags } from '../data/websiteConfig';

function PodcastPanel({ limit = Infinity, selectedTag = null, sortBy = 'date' }) {
  const filteredAndSortedPodcasts = podcasts
    .filter(podcast => !selectedTag || podcast.tags.includes(selectedTag)) // Filter by selectedTag
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'episodeNumber') return b.episodeNumber - a.episodeNumber;
      return 0;
    })
    .slice(0, limit);

  return (
    <div className='section'>
      <div className="container">
        <div className="grid">
          {filteredAndSortedPodcasts.map((podcast, index) => (
            <div className="grid-item" key={index}>
              <div className="image">
                <img src={podcast.image} alt={podcast.title} />
                <div className="bubble">
                  Episode {podcast.episodeNumber} - {podcast.date}
                </div>
              </div>
              <h3>{podcast.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastPanel;