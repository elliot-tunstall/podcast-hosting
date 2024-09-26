import React, { useState } from 'react';
import Transcription from './Transcription';

function TranscriptionPaywall({ podcast }) {
  const [isPaid, setIsPaid] = useState(false);

  const handlePurchase = () => {
    // In a real application, this would integrate with a payment processor
    setIsPaid(true);
  };

  if (!isPaid) {
    return (
      <div className="transcription-paywall">
        <h3>Access Transcription</h3>
        <p>Unlock the transcription for this podcast to enhance your learning experience.</p>
        <button onClick={handlePurchase}>Purchase Transcription ($5)</button>
      </div>
    );
  }

  return (
    <div className="transcription">
      <h3>Transcription</h3>
      <Transcription podcast={podcast}/>
    </div>
  );
}

export default TranscriptionPaywall;