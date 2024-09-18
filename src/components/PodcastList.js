import React from 'react';
import { Link } from 'react-router-dom';
import './PodcastList.css';
import { podcasts } from '../data/podcastData';
import { tags } from '../data/websiteConfig';

function PodcastList({ limit = Infinity, selectedTag = null, sortBy = 'date' }) {
  const filteredAndSortedPodcasts = podcasts
    .filter(podcast => !selectedTag || podcast.tags.includes(selectedTag)) // Filter by selectedTag
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'episodeNumber') return b.episodeNumber - a.episodeNumber;
      return 0;
    })
    .slice(0, limit);

  return (
    <div className="section">
      <div className="main-container">
        <div className="center-content">
          <div className="limit-920">
            <div className="w-dyn-list">
              <div role="list" className="podcasts-collection-list w-dyn-items">
                {filteredAndSortedPodcasts.map(podcast => (
                  <div key={podcast.id} role="listitem" className="podcast-item w-dyn-item">
                    <Link to={`/podcast/${podcast.id}`} className="podcast-link-block w-inline-block">
                      <div className="podcast-item-left">
                        <div className="episode-number-wrap">
                          <div className="episode-number">EP {podcast.episodeNumber}</div>
                        </div>
                        <div className="episode-date">{podcast.date}</div>
                      </div>
                      <div className="podcast-image" style={{backgroundImage: `url(${podcast.image})`}}>
                        <img src="https://cdn.prod.website-files.com/633b272ee58f611bff84db02/633c17d760b06808d41a61e4_Play%20Button.svg" loading="lazy" alt="" className="play-image" />
                        <div className="overlay-image-podcast"></div>
                      </div>
                      <div className="episode-right-wrap">
                        <div className='tags-wrap'>
                          {podcast.tags.map((tag, index) => (
                          <div key={index} className="tag" style={{backgroundColor: getTagColor(tag)}}>
                            <div>{tag}</div>
                          </div>
                          ))}
                        </div>
                        <div className="podcast-overview-title">{podcast.title}</div>
                        <p className="paragraph-medium">{podcast.description}</p>
                        <div className="guest-wrap">
                          <div className="guest-image" style={{backgroundImage: `url(${podcast.guestImage})`}}></div>
                          <div className="with-text-block">with</div>
                          <div>{podcast.guestName}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastList;

function getTagColor(tag) {
  return tags[tag];
}