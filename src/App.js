import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PodcastPage from './pages/PodcastPage';
import Podcasts from './pages/Podcasts';
import Admin from './pages/Admin';
import SignIn from './components/sign-in-side/SignInSide.js'


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast/:id" element={<PodcastPage />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
