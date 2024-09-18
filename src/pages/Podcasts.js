import React, { useState } from 'react';
import PodcastList from '../components/PodcastList';
import './Podcasts.css';
import { tags } from '../data/websiteConfig';

function Podcasts() {
  const [selectedTag, setSelectedTag] = useState(null); // State to hold the selected tag

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
    console.log("Selected Tag:", tag);
  }

  return (
    <div className="section podcasts">
      <h2>Explore podcasts </h2>
      <div className='tag-line'>
        <div className="tag" 
          style={{ 
            border: '1.5px solid black', 
            backgroundColor: selectedTag === null ? 'black' : 'transparent', // Set background color for active tag
            color: selectedTag === null ? 'white' : '#333' // Change text color for active tag
            }} 
          onClick={() => handleTagClick(null)}>
          <div>Any</div>
        </div>

        {Object.keys(tags).map((tag, index) => (
          <div key={index} 
            className={`tag ${selectedTag === tag ? 'active' : ''}`} // Apply active class conditionally
            style={{
              border: `1.5px solid ${tags[tag]}`, // Set border color based on tag
              backgroundColor: selectedTag === tag ? tags[tag] : 'transparent', // Set background color for active tag
              color: selectedTag === tag ? 'white' : '#333' // Change text color for active tag
          }}
          onClick={() => handleTagClick(tag)} // Pass the tag name to the click handler
          >
            <div>{tag}</div>
          </div>
        ))}
      </div>
      <PodcastList selectedTag={selectedTag} /> {/* Pass the selected tag to PodcastList */}
    </div>
  );
}

export default Podcasts;
