import React, { useState, useRef, useEffect } from 'react';
import './chatArea.css';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import VoiceVideoButton from './buttons/ui/VoiceOrVideoButton';

const ChatArea = ({ friend }) => {
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesEndRef]);

  const handleVoiceOrVideoHold = (isVideoMode) => {
    setIsRecording(true);
    console.log(isVideoMode ? "Recording Video" : "Recording Voice");
  };

  const handleVoiceOrVideoRelease = () => {
    setIsRecording(false);
    console.log("Stopped Recording");
  };

  const messages = [
    { id: 1, text: 'Привет!', sender: 'me', time: '10:00' },
    { id: 2, text: 'Привет! Как дела?', sender: 'friend', time: '10:01' },
    { id: 3, text: 'Все хорошо, спасибо!', sender: 'me', time: '10:02' },
  ];

  // Check if `friend` is defined
  if (!friend) {
    return <div className="chat__area">
      <div className="close__chat__area">
      Выберите друга для начала чата
      </div>
    </div>;
  }

  return (
    <div className="chat__area">
      {/* Chat Header */}
      <div className="chat__header">
        <img src={friend.avatar} alt={friend.name} className="avatar__open_chat" />
        <div className="name">{friend.name}</div>
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'friend' && (
              <img
                src={friend.avatar}
                alt={friend.name}
                className="message__avatar"
              />
            )}
            <div className="message__content">
              <div className="message__text">{message.text}</div>
              <div className="message__time">{message.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat__input-container">
        <button className="attach__button">
          <FaPaperclip className="attach__icon" />
        </button>
        <input type="text" placeholder="Отправить сообщение" className="chat__input" />

        <button className="send__button">
          <FaPaperPlane className="send__icon" />
        </button>

        {/* Voice/Video Button */}
        <VoiceVideoButton
          onHold={handleVoiceOrVideoHold}
          onRelease={handleVoiceOrVideoRelease}
        />
      </div>
    </div>
  );
};

export default ChatArea;