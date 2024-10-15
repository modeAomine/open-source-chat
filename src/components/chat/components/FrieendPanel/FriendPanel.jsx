import React, { useState, useEffect, useRef } from 'react';
import './friendPanel.css';
import ActivityFeed from './ui/Activity/ActivityFeed.jsx';
import UserModal from '../FriendList/ui/UserModal.jsx';

const activities = [
    { username: 'Иван', action: 'отправил сообщение', avatar: 'https://via.placeholder.com/50' },
    { username: 'Мария', action: 'вошла в сеть', avatar: 'https://via.placeholder.com/50' },
];

const TABS = ['all', 'online', 'offline', 'pending', 'blocked', 'submitted_applications'];

const FriendsPanel = ({ friends, fetchFriends, onOpenUserModal }) => {
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'all');
    const [searchTerm, setSearchTerm] = useState('');
    const [indicatorStyles, setIndicatorStyles] = useState({});
    const tabsRef = useRef([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

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

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const filteredFriends = friends.filter(friend => {
        if (activeTab === 'all') return friend.status === 'confirmed' && friend.status !== 'blocked';
        if (activeTab === 'online') return friend.isOnline && friend.status === 'confirmed' && friend.status !== 'blocked';
        if (activeTab === 'offline') return !friend.isOnline && friend.status === 'confirmed' && friend.status !== 'blocked';
        if (activeTab === 'pending') return friend.status === 'pending';
        if (activeTab === 'blocked') return friend.status === 'blocked';
        if (activeTab === 'submitted_applications') return friend.status === 'submitted';
        return false;
    });

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
                        {tab === 'offline' && 'Не в сети'}
                        {tab === 'pending' && 'Ожидают'}
                        {tab === 'blocked' && 'Заблокированные пользователи'}
                        {tab === 'submitted_applications' && 'Отправленные заявки'}
                    </button>
                ))}
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
                    {filteredFriends.map((friend) => (
                        <div key={friend.id} className="friend-item" onClick={() => handleUserClick(friend)}>
                            <img
                                src={friend.filename || 'https://via.placeholder.com/50'}
                                alt={friend.username}
                                className="friend-avatar"
                            />
                            <span className="friend-name">{friend.username}</span>
                        </div>
                    ))}
                </div>

                <ActivityFeed activities={activities} />
            </div>

            {selectedUser && (
                <UserModal 
                    user={selectedUser} 
                    onClose={handleCloseModal} 
                    fetchFriends={fetchFriends} 
                    onSelectFriend={onOpenUserModal} 
                />
            )}
        </div>
    );
};

export default FriendsPanel;