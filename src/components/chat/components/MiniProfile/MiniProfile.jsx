import React, { useState } from 'react';
import './miniProfile.css';
import mic_icon from '../../../../static/mic.svg';
import ushi_icon from '../../../../static/ushi.svg';
import settings_icon from '../../../../static/settings.svg';

const MiniProfile = ({ user, onOpenSettings }) => {
    const [isUserInfoVisible, setUserInfoVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleUserInfo = () => {
        setUserInfoVisible(!isUserInfoVisible);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mini-profile">
            <div className="mini-profile__avatar" onClick={toggleUserInfo}>
                <img src={user?.avatar} alt="User Avatar" />
            </div>
            <div className={`user-info-mini ${isUserInfoVisible ? 'visible' : ''}`}>
                <img className="user-info__avatar" src={user?.avatar} alt={user.username} />
                <div className="user-info__main">
                    <span className="user-info__name">{user?.username}</span>
                    <span className="user-info__role">{user?.role ? 'Разработчик' : 'Разработчик'}</span>

                    <span 
                        className="user-info__bio" 
                        onMouseEnter={showModal} 
                        onMouseLeave={hideModal}
                    >
                        {user?.bio?.slice(0, 10)}{user?.bio?.length > 10 ? '...' : ''}
                    </span>
                </div>

                <div className="user-info__center">
                    <span className="user-info__activity">{user?.active ? 'Играет в Dota 2' : 'Играет в Dota 2'}</span>
                    <span className="user-info__registration-date">{user?.registration_date ? '13.10.2024' : 'хзч'}</span>
                </div>
            </div>
            <div className="mini-profile__info">
                <span className="mini-profile__username">{user?.username}</span>
                <span className="mini-profile__status">{user?.active || 'Online'}</span>
            </div>
            <div className="mini-profile__icons">
                <img src={mic_icon} alt="Mic Icon" className="mini-profile__icon" />
                <img src={ushi_icon} alt="Ushi Icon" className="mini-profile__icon" />
                <img
                    src={settings_icon}
                    alt="Settings Icon"
                    className="mini-profile__icon"
                    onClick={() => onOpenSettings(user)}
                />
            </div>

            {/* Модальное окно для показа полной биографии */}
            {isModalVisible && (
                <div className="bio-modal" onMouseEnter={showModal} onMouseLeave={hideModal}>
                    <div className="bio-modal-content">
                        <p>{user?.bio}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MiniProfile;