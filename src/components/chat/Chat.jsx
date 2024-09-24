import React, { useState } from 'react';
import FriendList from './components/FriendList/FriendList.jsx';
import ChatArea from './components/ChatArea/ChatArea.jsx';
import Menu from './components/Menu/Menu.jsx';
import LanguageSettings from '../chat/components/LaunguageSettings/LanguageSettings.jsx';
import './chat.css';

const Chat = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);

  return (
    <div className="chat">
      <FriendList onSelectFriend={setSelectedFriend} />
      <ChatArea friend={selectedFriend} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-button"
        >
          <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      )}
      {isLanguageSettingsOpen && (
        <LanguageSettings onClose={() => setIsLanguageSettingsOpen(false)} />
      )}
    </div>
  );
};

export default Chat;