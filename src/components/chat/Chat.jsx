import React, { useState, useEffect } from 'react';
import FriendList from './components/FriendList/FriendList.jsx';
import ChatArea from './components/ChatArea/ChatArea.jsx';
import MiniProfile from './components/MiniProfile/MiniProfile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSettings from '../chat/components/LaunguageSettings/LanguageSettings.jsx';
import './chat.css';
import Group from './components/GroupBar/Group.jsx';
import FriendsPanel from './components/FrieendPanel/FriendPanel.jsx';
import { get_status_friend } from '../service/api.jsx';

const groups = [
  { id: 1, name: 'Group 1', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Group 2', avatar: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Group 3', avatar: 'https://via.placeholder.com/50' },
];

const friends = [
  // { id: 1, username: 'Друг 1', filename: 'https://via.placeholder.com/50', isOnline: true, isPending: false, isBlocked: false },
  // { id: 2, username: 'Друг 2', filename: 'https://via.placeholder.com/50', isOnline: false, isPending: true, isBlocked: false },
  // { id: 3, username: 'Друг 3', filename: 'https://via.placeholder.com/50', isOnline: false, isPending: false, isBlocked: true },
];

const Chat = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);
  const [user] = useState({
    username: 'username',
    filename: '/path/to/avatar.png',
  });

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const requests = await get_status_friend();
        setPendingRequests(requests);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="chat">
      <FriendList onSelectFriend={handleFriendSelect} />
      {selectedFriend ? (
        <ChatArea friend={selectedFriend} onClose={handleCloseChat} className="chat__area" />
      ) : (
        <FriendsPanel friends={friends} pendingRequests={pendingRequests} onClose={handleCloseChat} className='friend-panel' />
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