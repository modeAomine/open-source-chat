import React, { useState, useEffect, useCallback } from 'react';
import FriendList from './components/FriendList/FriendList.jsx';
import ChatArea from './components/ChatArea/ChatArea.jsx';
import GroupChatArea from './components/ChatArea/GroupChatArea.jsx';
import MiniProfile from './components/MiniProfile/MiniProfile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSettings from '../chat/components/LaunguageSettings/LanguageSettings.jsx';
import './chat.css';
import Group from './components/GroupBar/Group.jsx';
import FriendsPanel from './components/FrieendPanel/FriendPanel.jsx';
import { get_status_friend, get_user_channel } from '../service/api.jsx';
import UserModal from './components/FriendList/ui/UserModal.jsx';
import ProfileModal from './components/ProfileModel/ProfileModal.jsx';
import { useAuth } from '../middleware/AuthContext.jsx';

const Chat = () => {
  const [friends, setFriends] = useState([]);
  const [channel, setChannel] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedGroupChat, setSelectedGroupChat] = useState(null);
  const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);
  const { user, fetchUser } = useAuth();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const fetchFriends = async () => {
    try {
      const friendsList = await get_status_friend();
      setFriends(friendsList);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchChannel = async () => {
    try {
      const channelList = await get_user_channel();
      if (Array.isArray(channelList)) {
        setChannel(channelList);
      } else {
        console.error('Полученные данные не являются массивом:', channelList);
        setChannel([]);
      }
    } catch (error) {
      console.error(error.message);
      setChannel([]);
    }
  };

  const fetchUsers = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken && !user) {
      fetchUser(accessToken, refreshToken);
    }
  }, [fetchUser, user]);

  useEffect(() => {
    fetchFriends();
    fetchUsers();
    fetchChannel();
  }, [fetchUsers]);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setSelectedGroupChat(null);
  };

  const handleGroupChatSelect = (groupChat) => {
    setSelectedGroupChat(groupChat);
    setSelectedFriend(null);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
    setSelectedGroupChat(null);
  };

  const handleOpenUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenProfileModal = (user) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <div className="chat">
      <FriendList
        friends={friends}
        onSelectFriend={handleFriendSelect}
        onOpenUserModal={handleOpenUserModal}
        channels={channel}
        onSelectGroupChat={handleGroupChatSelect}
      />

      {selectedFriend ? (
        <ChatArea friend={selectedFriend} onClose={handleCloseChat} currentUser={user} className="chat__area" />
      ) : selectedGroupChat ? (
        <GroupChatArea groupChat={selectedGroupChat} onClose={handleCloseChat} currentUser={user} className="chat__area" />
      ) : (
      <FriendsPanel
        friends={friends}
        onClose={handleCloseChat}
        className="friend-panel"
        onOpenUserModal={handleOpenUserModal}
      />
      )}

      {isLanguageSettingsOpen && (
        <LanguageSettings onClose={() => setIsLanguageSettingsOpen(false)} />
      )}

      <Group groups={channel} onSelectGroup={handleGroupChatSelect} />
      <MiniProfile user={user} onOpenSettings={handleOpenProfileModal} />
      {isUserModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseUserModal}
          fetchFriends={fetchFriends}
          onSelectFriend={handleFriendSelect}
        />
      )}
      {isProfileModalOpen && (
        <ProfileModal user={selectedUser} onClose={handleCloseProfileModal} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Chat;