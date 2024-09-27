import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import './Transcription.css';

const API_URL = 'https://api-free.deepl.com/v2/translate';

const translateText = async (text, targetLanguage, apiKey) => {
  if (!apiKey) {
    throw new Error('API key is missing');
  }

  try {
    const response = await axios.post(API_URL, null, {
      params: {
        auth_key: apiKey,
        text,
        target_lang: targetLanguage.toUpperCase(),
      },
    });
    return response.data.translations[0].text;
  } catch (error) {
    console.error("Translation error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Translation failed');
  }
};

const Tooltip = ({ text, position, onClose }) => (
  <div
    className="tooltip"
    style={{
      position: 'absolute',
      left: position.x,
      top: position.y,
      backgroundColor: 'white',
      border: '1px solid black',
      padding: '5px',
      borderRadius: '3px',
      zIndex: 1000
    }}
  >
    {text}
    <button onClick={onClose} style={{ marginLeft: '5px' }}>×</button>
  </div>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  // Add more languages as needed
];

function Transcription({ podcast }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const transcriptionRef = useRef(null);

  const handleTranslation = useCallback(async (text, language) => {
    setIsLoading(true);
    try {
      const apiKey = process.env.REACT_APP_DEEPL_KEY;
      const result = await translateText(text, language, apiKey);
      return result;
    } catch (error) {
      console.error('Translation error:', error);
      return `Translation failed: ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMouseUp = useCallback(async (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // Check if the selection is within the transcription paragraph
    if (selectedText && transcriptionRef.current.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0).getBoundingClientRect();
      const result = await handleTranslation(selectedText, selectedLanguage);
      setTooltip({
        visible: true,
        text: result,
        x: range.x + window.scrollX,
        y: range.y + window.scrollY - 30
      });
    } else {
      setTooltip(prev => ({ ...prev, visible: false }));
    }
  }, [selectedLanguage, handleTranslation]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div className="transcription">
      <select 
        onChange={(e) => setSelectedLanguage(e.target.value)} 
        value={selectedLanguage}
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
      <p ref={transcriptionRef} className="translatable-text"
        title="Select text to translate">{podcast.transcription}</p>
      {tooltip.visible && (
        <Tooltip 
          text={isLoading ? "Translating..." : tooltip.text}
          position={{ x: tooltip.x, y: tooltip.y }}
          onClose={() => setTooltip(prev => ({ ...prev, visible: false }))}
        />
      )}
    </div>
  );
}

Transcription.propTypes = {
  podcast: PropTypes.shape({
    transcription: PropTypes.string.isRequired,
  }).isRequired,
};

export default Transcription;