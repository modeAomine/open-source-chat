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
import UserModal from './components/FriendList/ui/UserModal.jsx';

const groups = [
  { id: 1, name: 'Group 1', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Group 2', avatar: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Group 3', avatar: 'https://via.placeholder.com/50' },
];

const Chat = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);
  const [user] = useState({
    username: 'username',
    filename: '/path/to/avatar.png',
  });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const friendsList = await get_status_friend();
      setFriends(friendsList);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
  };

  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="chat">
      <FriendList friends={friends} onSelectFriend={handleFriendSelect} onOpenUserModal={handleOpenUserModal} />
      
      {/* Если выбран друг, рендерим компонент чата поверх панели */}
      {selectedFriend ? (
        <ChatArea friend={selectedFriend} onClose={handleCloseChat} className="chat__area" />
      ) : (
        <FriendsPanel
          friends={friends}
          onClose={handleCloseChat}
          fetchFriends={fetchFriends}
          className="friend-panel"
          onOpenUserModal={handleOpenUserModal}
        />
      )}

      {isLanguageSettingsOpen && (
        <LanguageSettings onClose={() => setIsLanguageSettingsOpen(false)} />
      )}

      <Group groups={groups} />
      <MiniProfile user={user} />
      {isUserModalOpen && (
        <UserModal 
          user={selectedUser} 
          onClose={handleCloseUserModal} 
          fetchFriends={fetchFriends} 
          onSelectFriend={handleFriendSelect} 
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Chat;