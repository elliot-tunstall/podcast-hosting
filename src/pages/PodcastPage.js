import React, { useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PodcastPlayer from '../components/PodcastPlayer';
import TranscriptionPaywall from '../components/TranscriptionPaywall';
import { podcasts } from '../data/podcastData'; 
import { tags } from '../data/websiteConfig';
import './PodcastPage.css'
import episodeWaves from '../images/episodeWaves.webm'
import WhereToListen from '../components/whereToListen';

function PodcastPage() {
  const { id } = useParams();
  const podcast = podcasts.find(p => p.id === parseInt(id));
  const videoRef = useRef(null); // Create a ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set playback speed to half
    }
  }, []);

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="podcast-page">
      <div className='section'>
        <div className='container'>
          <div class="card">
            <div class="image-container">
                <img src={podcast.image} alt={podcast.title}/>
            </div>
            <div class="content">
              <div class="text-content">
                <div className='content-head'>
                  <div className='waves inline-block'>
                    <div class="episode-number">Episode {podcast.episodeNumber}</div>
                    <video ref={videoRef} width="80" height="50" autoPlay loop muted>
                      <source src={episodeWaves} type="video/webm" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
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
                <div className="guest-wrap">
                  <div className="guest-image" style={{backgroundImage: `url(${podcast.guestImage})`}}></div>
                  <div className="with-text-block">with</div>
                  <div>{formatName(podcast.guestName)}</div>
                </div>
              </div>
            </div>
          </div>
          <PodcastPlayer podcast={podcast} />
          <WhereToListen />
          <TranscriptionPaywall podcast={podcast} />
        </div>
      </div>
    </div>
  );
}

export default PodcastPage;

function getTagColor(tag) {
  return tags[tag];
}

function formatName(name) {
  const nameParts = name.split(' '); // Split the title into words
  const firstName = nameParts[0];
  const secondName = nameParts.slice(1).join(' '); // Join the rest as the second name

  if (name.length < 30) {
    return name;
  } else if (secondName.length > 30) { // Corrected 'elseif' to 'else if'
    return nameParts.map(part => part.charAt(0)).join('.'); // Return initials
  } else {
    return `${firstName.charAt(0)}.${secondName}`; // Return first letter of first name and second name
  }
}