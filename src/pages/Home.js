import React from 'react';
// import PodcastList from '../redundent/PodcastList';
// import PodcastPanel from '../redundent/PodcastPanel';
import PodcastHighlight from '../components/PodcastHighlight';
import WhereToListen from '../components/whereToListen';
import './Home.css';
import { WEBSITE_NAME } from '../data/websiteConfig';
// import homeGif from '../images/homeGif.gif'; 
import home from '../images/home2.mp4'

function Home() {
  return (
    <div className="home">
      <div className='welcome-animated'>
        <video className='background-video' width="1080" height="720" autoPlay muted>
          <source src={home} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <section className="section primary-background">
        <div className="container where-to-listen">
          <WhereToListen />
        </div>
      </section>
      <section className="section primary-background">
        <div className="container">
          <h1 className="black section">Latest episodes</h1>
        </div>
        <PodcastHighlight limit={5} />
      </section>
    </div>
  );
}

export default Home;