import React from 'react';
import PodcastList from '../components/PodcastList';

function Home() {
  return (
    <div className="home">
      <h2>Welcome to English Learning Podcasts</h2>
      <p>Learn English anywhere with interesting stories on a diverse range of topics.</p>
      <PodcastList />
    </div>
  );
}

export default Home;