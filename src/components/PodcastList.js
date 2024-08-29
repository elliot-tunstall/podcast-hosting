import React from 'react';
import { Link } from 'react-router-dom';
import './PodcastList.css';

const podcasts = [
  {
    id: 1,
    episodeNumber: 5,
    date: "9.20.2022",
    image: "https://cdn.prod.website-files.com/633b4f6eba6a6237756cd0fc/633b60c6dd6a1389cccb642b_Pd5.jpg",
    tag: "Design",
    tagColor: "hsla(37.5, 78.57%, 78.04%, 1.00)",
    title: "Good design is made from coffee",
    description: "Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Suspendisse eu ligula. Nunc nec neque. Praesent ut ligula non mi varius sagittis. Aliquam erat volutpat.",
    guestImage: "https://cdn.prod.website-files.com/633b4f6eba6a6237756cd0fc/633bf4c359b53875c2406d3e_ppl5.jpg",
    guestName: "Isaiah Fischer"
  },
  // Add more podcast episodes here...
];

function PodcastList() {
  return (
    <div className="section black bottom-40">
      <div className="main-container">
        <div className="center-content">
          <div className="limit-920">
            <div className="w-dyn-list">
              <div role="list" className="podcasts-collection-list w-dyn-items">
                {podcasts.map(podcast => (
                  <div key={podcast.id} role="listitem" className="podcast-item w-dyn-item">
                    <Link to={`/podcast/${podcast.id}`} className="podcast-link-block w-inline-block">
                      <div className="podcast-item-left">
                        <div className="episode-number-wrap">
                          <div className="episode-number">EP</div>
                          <div className="episode-number">{podcast.episodeNumber}</div>
                        </div>
                        <div className="episode-date">{podcast.date}</div>
                      </div>
                      <div className="podcast-image" style={{backgroundImage: `url(${podcast.image})`}}>
                        <img src="https://cdn.prod.website-files.com/633b272ee58f611bff84db02/633c17d760b06808d41a61e4_Play%20Button.svg" loading="lazy" alt="" className="play-image" />
                        <div className="overlay-image-podcast"></div>
                      </div>
                      <div className="episode-right-wrap">
                        <div className="tag" style={{backgroundColor: podcast.tagColor}}>
                          <div>{podcast.tag}</div>
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