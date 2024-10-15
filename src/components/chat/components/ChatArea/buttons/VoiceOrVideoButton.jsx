import React, { useState } from 'react';
import { FaMicrophone, FaVideo } from 'react-icons/fa';
import './ui/voiceOrVideo.css';

const VoiceVideoButton = ({ onHold, onRelease }) => {
    const [isVideoMode, setIsVideoMode] = useState(false);
  
    const handleIconClick = () => {
      setIsVideoMode(!isVideoMode);
    };
  
    const handleMouseDown = () => {
      onHold(isVideoMode);
    };
  
    const handleMouseUp = () => {
      onRelease();
    };
  
    return (
      <button
        className="voice__button"
        onClick={handleIconClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="icon-container">
          <FaMicrophone className={`voice__icon ${isVideoMode ? 'hidden' : ''}`} />
          <FaVideo className={`voice__icon ${isVideoMode ? '' : 'hidden'}`} />
        </div>
      </button>
    );
  };
  
  export default VoiceVideoButton;