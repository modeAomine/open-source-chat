import React, { useState, useEffect, useRef } from 'react';
import './friendPanel.css';
import ActivityFeed from './ui/ActivityFeed.jsx';
import { get_pending_friend } from '../../../service/api.jsx';
import { Avatar } from '@mui/material';

const activities = [
    { username: 'Иван', action: 'отправил сообщение', avatar: 'https://via.placeholder.com/50' },
    { username: 'Мария', action: 'вошла в сеть', avatar: 'https://via.placeholder.com/50' },
];

const TABS = ['all', 'online', 'pending', 'blocked', 'submitted_applications'];

const FriendsPanel = ({ friends, pendingRequests }) => {
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'all');
    const [searchTerm, setSearchTerm] = useState('');
    const [indicatorStyles, setIndicatorStyles] = useState({});
    const tabsRef = useRef([]);
    const [localPendingRequests, setLocalPendingRequests] = useState([]);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const requests = await get_pending_friend();
                setLocalPendingRequests(requests);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchPendingRequests();
    }, []);

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

    const filteredFriends = friends.filter((friend) =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {activeTab === 'submitted_applications' ? (
                        localPendingRequests.map((request) => (
                            <div key={request.id} className="friend-item">
                                <img
                                    src={request.filename || 'https://via.placeholder.com/50'} // используйте filename
                                    alt={request.username} // используйте username
                                    className="friend-avatar"
                                />
                                <span className="friend-name">{request.username}</span>
                            </div>
                        ))
                    ) : (
                        filteredFriends
                            .filter(friend => {
                                if (activeTab === 'all') return true;
                                if (activeTab === 'online') return friend.isOnline;
                                if (activeTab === 'pending') return friend.isPending;
                                if (activeTab === 'blocked') return friend.isBlocked;
                                if (activeTab === 'submitted_applications') return friend.submitted_applications;
                                return false;
                            })
                            .map((friend) => (
                                <div key={friend.id} className="friend-item">
                                    <img
                                        src={friend.filename || 'https://via.placeholder.com/50'} // используйте filename
                                        alt={friend.username} // используйте username
                                        className="friend-avatar"
                                    />
                                    <span className="friend-name">{friend.username}</span>
                                </div>
                            ))
                    )}
                </div>

                <ActivityFeed activities={activities} />
            </div>
        </div>
    );
};

export default FriendsPanel;
