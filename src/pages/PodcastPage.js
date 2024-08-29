import React from 'react';
import { useParams } from 'react-router-dom';
import PodcastPlayer from '../components/PodcastPlayer';
import TranscriptionPaywall from '../components/TranscriptionPaywall';

const podcasts = [
  { id: 1, title: "Basics of English Grammar", duration: "15:00", audioUrl: "/path/to/audio1.mp3", transcription: "Full transcription here..." },
  { id: 2, title: "Common Everyday Phrases", duration: "20:00", audioUrl: "/path/to/audio2.mp3", transcription: "Full transcription here..." },
  { id: 3, title: "Improving Your Pronunciation", duration: "18:00", audioUrl: "/path/to/audio3.mp3", transcription: "Full transcription here..." },
];

function PodcastPage() {
  const { id } = useParams();
  const podcast = podcasts.find(p => p.id === parseInt(id));

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="podcast-page">
      <PodcastPlayer podcast={podcast} />
      <TranscriptionPaywall podcast={podcast} />
    </div>
  );
}

export default PodcastPage;