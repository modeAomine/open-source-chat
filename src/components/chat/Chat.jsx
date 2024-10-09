import React, { useState } from 'react';
import FriendList from './components/FriendList/FriendList.jsx';
import ChatArea from './components/ChatArea/ChatArea.jsx';
import MiniProfile from './components/MiniProfile/MiniProfile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSettings from '../chat/components/LaunguageSettings/LanguageSettings.jsx';
import './chat.css';
import Group from './components/GroupBar/Group.jsx';

const groups = [
  { id: 1, name: 'Group 1', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Group 2', avatar: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Group 3', avatar: 'https://via.placeholder.com/50' },
];

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);
  const [user] = useState({
    username: 'username',
    avatar: '/path/to/avatar.png',
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
    setIsChatOpen(false);
  };

  return (
    <div className="chat">
      <FriendList onSelectFriend={handleFriendSelect} />
      {isChatOpen && (
        <ChatArea
          friend={selectedFriend}
          onClose={handleCloseChat}
          className="chat__area"
        />
      )}
      {isLanguageSettingsOpen && (
        <LanguageSettings onClose={() => setIsLanguageSettingsOpen(false)} />
      )}
      <Group groups={groups} />
      <MiniProfile user={user} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Chat;
