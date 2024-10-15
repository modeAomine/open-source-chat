import React, { useState } from 'react';
import './friendPanel.css';
import ActivityFeed from './ui/Activity/ActivityFeed.jsx';
import UserModal from '../FriendList/ui/UserModal.jsx';
import FriendsPanelHeader from './ui/FriendsPanelHeader/FriendsPanelHeader.jsx';

const activities = [
    { username: 'Иван', action: 'отправил сообщение', avatar: 'https://via.placeholder.com/50' },
    { username: 'Мария', action: 'вошла в сеть', avatar: 'https://via.placeholder.com/50' },
];

const FriendsPanel = ({ friends, fetchFriends, onOpenUserModal }) => {
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'all');
    const [searchTerm, setSearchTerm] = useState('');
    const [indicatorStyles, setIndicatorStyles] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
            <FriendsPanelHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                indicatorStyles={indicatorStyles}
                setIndicatorStyles={setIndicatorStyles}
            />

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
                        <div key={friend.id} className="friend-item" onClick={() => setSelectedUser(friend)}>
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
                    onClose={() => setSelectedUser(null)} 
                    fetchFriends={fetchFriends} 
                    onSelectFriend={onOpenUserModal} 
                />
            )}
        </div>
    );
};

export default FriendsPanel;
