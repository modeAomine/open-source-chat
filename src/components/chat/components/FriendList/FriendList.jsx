import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './friendList.css';
import UserModal from './ui/UserModal.jsx';

const FriendList = ({ friends, onSelectFriend }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredFriends = friends.filter((friend) =>
    searchResults.length > 0
      ? searchResults.some((result) => result.username === friend.username)
      : true
  );

  return (
    <div className="friend-list">
      <div className="header">
        <SearchBar setSearchResults={setSearchResults} />
      </div>

      {searchResults.length > 0 ? (
        <div className="friends">
          <h4>Глобальный поиск</h4>
          {searchResults.map((user) => (
            <div key={user.id} className="friend" onClick={() => handleSelectUser(user)}>
              <img
                src={user.filename ? user.filename : 'https://via.placeholder.com/50'}
                alt={user.username}
                className="menu__avatar"
              />
              <div className="friend-info">
                <div className="name">{user.username}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="friends">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="friend" onClick={() => onSelectFriend(friend)}>
              <img src={friend.avatar || 'https://via.placeholder.com/50'} alt={friend.username} className="menu__avatar" />
              <div className="friend-info">
                <div className="name">{friend.username}</div>
                <div className="last-message">{friend.lastMessage}</div>
              </div>
              <div className="time">{friend.time}</div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default FriendList;