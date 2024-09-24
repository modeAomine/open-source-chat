import React, { useState } from 'react';
import './chatArea.css';
import { useTranslation } from 'react-i18next';

const ChatArea = ({ friend }) => {
  const { t } = useTranslation();
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);

  if (!friend) {
    return (
      <div className="chat-area">
        <h3>{t('Выберите друга для начала чата')}</h3>
      </div>
    );
  }

  const messages = [
    { id: 1, text: 'Привет!', sender: 'me' },
    { id: 2, text: 'Привет! Как дела?', sender: 'friend' },
    { id: 3, text: 'Все хорошо, спасибо!', sender: 'me' },
  ];

  return (
    <div className="chat-area">
      <div className="chat-header">
        <img src={friend.avatar} alt={friend.name} className="avatar" />
        <div className="name">{friend.name}</div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder={t('Отправить')} />
        <button className="attach-button">
          <svg className="attach-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
        </button>
        <button
          className={`voice-message-button ${isRecordingVideo ? 'recording-video' : ''}`}
          onClick={() => setIsRecordingVideo(!isRecordingVideo)}
        >
          <svg className={`voice-icon ${isRecordingVideo ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
          </svg>
          <svg className={`video-icon ${isRecordingVideo ? '' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatArea;