import React, { useState, useEffect, useRef } from 'react';
import './friendPanel.css';
import ActivityFeed from './ui/ActivityFeed.jsx';

const activities = [
    { name: 'Иван', action: 'отправил сообщение', avatar: 'https://via.placeholder.com/50' },
    { name: 'Мария', action: 'вошла в сеть', avatar: 'https://via.placeholder.com/50' },
];

const TABS = ['all', 'online', 'pending', 'blocked'];

const FriendsPanel = ({ friends }) => {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [indicatorStyles, setIndicatorStyles] = useState({});
  const tabsRef = useRef([]);

  // Обработчик переключения вкладок
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  // Обработчик поиска
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Рассчитываем позицию полоски под активной вкладкой
  useEffect(() => {
    const activeTabIndex = TABS.indexOf(activeTab);
    if (tabsRef.current[activeTabIndex]) {
      const tabElement = tabsRef.current[activeTabIndex];
      const { offsetLeft, clientWidth } = tabElement;
      setIndicatorStyles({
        left: `${offsetLeft}px`,
        width: `${clientWidth}px`,
      });
    }
  }, [activeTab]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="friends-panel">
      <div className="friends-panel__header">
        {TABS.map((tab, index) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active tab' : 'tab'}
            onClick={() => handleTabChange(tab)}
            ref={(el) => (tabsRef.current[index] = el)}
          >
            {tab === 'all' && 'Все друзья'}
            {tab === 'online' && 'В сети'}
            {tab === 'pending' && 'Ожидают'}
            {tab === 'blocked' && 'Заблокированные пользователи'}
          </button>
        ))}
        {/* <div className='header__button__++'>
            <text>123</text>
        </div> */}
        <div className="active-tab-indicator" style={indicatorStyles}></div>
      </div>

      <input
        type="text"
        placeholder="Поиск по друзьям"
        value={searchTerm}
        onChange={handleSearchChange}
        className="friends-panel__search"
      />

      <div className="friends-panel__content">
        <div className="friends-panel__list">
          {filteredFriends
            .filter(friend => {
              if (activeTab === 'all') return true;
              if (activeTab === 'online') return friend.isOnline;
              if (activeTab === 'pending') return friend.isPending;
              if (activeTab === 'blocked') return friend.isBlocked;
              return false;
            })
            .map((friend) => (
              <div key={friend.id} className="friend-item">
                <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                <span className="friend-name">{friend.name}</span>
              </div>
            ))}
        </div>

        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};

export default FriendsPanel;
