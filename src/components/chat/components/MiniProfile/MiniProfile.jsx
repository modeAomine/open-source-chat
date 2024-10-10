import React, { useEffect, useState } from 'react';
import './miniProfile.css';
import { useAuth } from '../../../middleware/AuthContext.jsx';
import Avatar from '../../../../static/default.svg';
import mic_icon from '../../../../static/mic.svg';
import ushi_icon from '../../../../static/ushi.svg';
import settings_icon from '../../../../static/settings.svg';
import ProfileModal from '../ProfileModel/ProfileModal.jsx';


const MiniProfile = () => {
    const { user, fetchUser } = useAuth();
    const [isInfoVisible, setInfoVisible] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken && !user) {
            fetchUser(accessToken, refreshToken);
        }
    }, [fetchUser, user]);

    const toggleUserInfo = () => {
        setInfoVisible(!isInfoVisible);
    };

    const openSettingsModal = () => {
        setSettingsModalOpen(true);
    };

    const closeSettingsModal = () => {
        setSettingsModalOpen(false);
    };

    return (
        <div className="mini-profile">
            <div className="mini-profile__avatar" onClick={toggleUserInfo}>
                <img src={user?.avatar || Avatar} alt="User Avatar" />
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
                    onClick={openSettingsModal}
                />
            </div>

            {isInfoVisible && (
                <div className="mini-profile__user-info">
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email || 'Not provided'}</p>
                    <p><strong>Status:</strong> {user?.status || 'No status'}</p>
                </div>
            )}

            {isSettingsModalOpen && (
                <ProfileModal
                    user={user}
                    setUser={() => {}} // Передайте функцию, если нужно обновлять пользователя
                    onClose={closeSettingsModal}
                />
            )}
        </div>
    );
};

export default MiniProfile;
