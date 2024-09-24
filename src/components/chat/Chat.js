import React, { useState } from 'react';
import FriendList from '../chat/components/FriendList/FriendList.js';
import ChatArea from '../chat/components/ChatArea/ChatArea.js';
import Menu from '../chat/components/Menu/Menu.js';
import './chat.css';

const Chat = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="chat">
      <FriendList />
      <ChatArea />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="menu-button"
      >
        <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  );
};

export default Chat;