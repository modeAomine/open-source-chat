import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './friendList.css';

const friends = [
  {
    id: 1,
    name: 'Друг 1',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'Привет! Как дела?',
    time: '10:30',
  },
  {
    id: 2,
    name: 'Друг 2',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'Увидимся позже!',
    time: '11:45',
  },
  {
    id: 3,
    name: 'Друг 3',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'До встречи!',
    time: '12:00',
  },
];

const FriendList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="friend-list">
      <div className="header">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="menu-button"
        >
        </button>
      </div>
      <div className="friends">
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="friend">
            <img src={friend.avatar} alt={friend.name} className="avatar" />
            <div className="friend-info">
              <div className="name">{friend.name}</div>
              <div className="last-message">{friend.lastMessage}</div>
            </div>
            <div className="time">{friend.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;