import React from 'react';
import PodcastList from '../components/PodcastList';
import WhereToListen from '../components/whereToListen';
import './Home.css';
import { WEBSITE_NAME } from '../data/websiteConfig';

function Home() {
  return (
    <div className="home">
      <section className="section primary-background">
        <div className="container">
          <h2>Welcome to { WEBSITE_NAME }</h2>
          <p>Learn English anywhere with interesting stories on a diverse range of topics.</p>
        </div>
        <div className="container where-to-listen">
          <WhereToListen />
        </div>
      </section>
      <section className="section secondary-background">
        <div className="container">
          <h1 className="black">Latest episodes</h1>
        </div>
        <PodcastList limit={5} />
      </section>
    </div>
  );
}

export default Home;