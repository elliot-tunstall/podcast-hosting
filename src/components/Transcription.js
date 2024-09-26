import React, { useState, useEffect } from "react";
import './Transcription.css';

function Transcription({ podcast }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const translateText = async (text) => {
    try {
      const response = await fetch(`https://api.example.com/translate?text=${text}&lang=${selectedLanguage}`);
      const data = await response.json();
      return data.translatedText; // Adjust based on API response structure
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text on error
    }
  };

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const translatedText = translateText(selectedText);
      const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
      setTooltip({
        visible: true,
        text: translatedText,
        x: range.x + window.scrollX,
        y: range.y + window.scrollY - 30 // Adjust for tooltip position
      });
    } else {
      setTooltip({ ...tooltip, visible: false });
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="transcription">
      <select onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        {/* Add more languages as needed */}
      </select>
      <p>
        {podcast.transcription}
      </p>
      {tooltip.visible && (
        <div 
          className="tooltip" 
          style={{ position: 'absolute', left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

export default Transcription;