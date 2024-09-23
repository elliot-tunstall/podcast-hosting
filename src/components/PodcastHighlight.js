import React from 'react';
import { Link } from 'react-router-dom';
import './PodcastHighlight.css';
import { podcasts } from '../data/podcastData';
import { tags } from '../data/websiteConfig';

function PodcastHighlight({ limit = Infinity, selectedTag = null, sortBy = 'date' }) {
  const filteredAndSortedPodcasts = podcasts
    .filter(podcast => !selectedTag || podcast.tags.includes(selectedTag)) // Filter by selectedTag
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'episodeNumber') return b.episodeNumber - a.episodeNumber;
      return 0;
    })
    .slice(0, limit);

  return (
    <div className='podcast-highlight'>
      <div className='section container'>
        <div className='media-flex'>
          {filteredAndSortedPodcasts.map((podcast, index) => (
          <div class="card">
            <div class="image-container">
                <img src={podcast.image} alt={podcast.title}/>
            </div>
            <div class="content">
                <div class="text-content">
                  <div className='content-head'>
                    <div class="episode-number">Episode {podcast.episodeNumber}</div>
                    <div className='tags-wrap'>
                      {podcast.tags.map((tag, index) => (
                      <div key={index} className="tag" style={{backgroundColor: getTagColor(tag)}}>
                        <div>{tag}</div>
                      </div>
                      ))}
                    </div>
                  </div>
                  <div className='title'>
                    {podcast.title}
                  </div>
                  <div className='description'>
                    {podcast.description}
                  </div> 
                </div>
                <div className='content-foot'>
                  <Link to={`/podcast/${podcast.id}`}>
                  <a class="play-button">
                      <span class="play-icon"></span>
                      Play Episode
                  </a>
                  </Link>
                  <div className="guest-wrap">
                    <div className="guest-image" style={{backgroundImage: `url(${podcast.guestImage})`}}></div>
                    <div className="with-text-block">with</div>
                    <div>{formatName(podcast.guestName)}</div>
                  </div>
                </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    );
  };

  export default PodcastHighlight;

  function getTagColor(tag) {
    return tags[tag];
  }

  function formatName(name) {
    const nameParts = name.split(' '); // Split the title into words
    const firstName = nameParts[0];
    const secondName = nameParts.slice(1).join(' '); // Join the rest as the second name
  
    if (name.length < 15) {
      return name;
    } else if (secondName.length > 15) { // Corrected 'elseif' to 'else if'
      return nameParts.map(part => part.charAt(0)).join('.'); // Return initials
    } else {
      return `${firstName.charAt(0)}.${secondName}`; // Return first letter of first name and second name
    }
  }