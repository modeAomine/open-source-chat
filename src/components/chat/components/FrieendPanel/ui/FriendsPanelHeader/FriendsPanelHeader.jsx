import React, { useEffect, useRef } from 'react';
import { FaUserFriends } from "react-icons/fa";

const TABS = ['all', 'online', 'offline', 'pending', 'blocked', 'submitted_applications'];

const FriendsPanelHeader = ({ activeTab, setActiveTab, indicatorStyles, setIndicatorStyles }) => {
    const tabsRef = useRef([]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
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
    }, [activeTab, setIndicatorStyles]);

    return (
        <div className="friends-panel__header">
            <span className='text-friends'>
                <FaUserFriends className='icon-friend' />
                Друзья
            </span>
            {TABS.map((tab, index) => (
                <button
                    key={tab}
                    className={activeTab === tab ? 'active tab' : 'tab'}
                    onClick={() => handleTabChange(tab)}
                    ref={(el) => (tabsRef.current[index] = el)}
                >
                    {tab === 'all' && 'Все'}
                    {tab === 'online' && 'В сети'}
                    {tab === 'offline' && 'Не в сети'}
                    {tab === 'pending' && 'Ожидание'}
                    {tab === 'blocked' && 'Заблокированные'}
                    {tab === 'submitted_applications' && 'Отправленные'}
                </button>
            ))}
            <button className='add__new__friend'>Добавить в друзья</button>
            <div className="active-tab-indicator" style={indicatorStyles}></div>
        </div>
    );
};

export default FriendsPanelHeader;