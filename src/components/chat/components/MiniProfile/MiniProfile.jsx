import React, { useEffect, useState } from 'react';
import './miniProfile.css';
import { useAuth } from '../../../middleware/AuthContext.jsx';
import mic_icon from '../../../../static/mic.svg';
import ushi_icon from '../../../../static/ushi.svg';
import settings_icon from '../../../../static/settings.svg';

const MiniProfile = ({ onOpenSettings }) => {
    const { user, fetchUser } = useAuth();
    const [isUserInfoVisible, setUserInfoVisible] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken && !user) {
            fetchUser(accessToken, refreshToken);
        }
    }, [fetchUser, user]);

    const toggleUserInfo = () => {
        setUserInfoVisible(!isUserInfoVisible);
    };

    return (
        <div className="mini-profile">
            <div className="mini-profile__avatar" onClick={toggleUserInfo}>
                <img src={user?.avatar} alt="User Avatar" />
            </div>
            <div className={`user-info ${isUserInfoVisible ? 'visible' : ''}`}>
                <div className='user-info__main'>
                    <span className="user-info__name">{user?.username}</span>
                    <span className="user-info__email">{user?.email}</span>
                    <span className='user-info__bio'>{user?.bio}</span>
                </div>
                <img className='user-info__avatar' src={user?.avatar} />
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
                    onClick={onOpenSettings}
                />
            </div>
        </div>
    );
};

export default MiniProfile;
