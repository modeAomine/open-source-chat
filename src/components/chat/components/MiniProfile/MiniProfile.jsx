import React, { useEffect } from 'react';
import './miniProfile.css';
import { useAuth } from '../../../middleware/AuthContext.jsx';
import Avatar from '../../../../static/default.svg';
import mic_icon from '../../../../static/mic.svg';
import ushi_icon from '../../../../static/ushi.svg';
import settings_icon from '../../../../static/settings.svg';


const MiniProfile = () => {
    const { user, fetchUser } = useAuth();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken && !user) {
            fetchUser(accessToken, refreshToken);
        }
    }, [fetchUser, user]);

    return (
        <div className="mini-profile">
            <div className="mini-profile__avatar">
                <img src={user?.avatar || Avatar} alt="User Avatar" />
            </div>
            <div className="mini-profile__info">
                <span className="mini-profile__username">{user?.username}</span>
                <span className="mini-profile__status">{user?.active || 'Online'}</span>
            </div>
            <div className="mini-profile__icons">
                <img src={mic_icon} alt="Mic Icon" className="mini-profile__icon" />
                <img src={ushi_icon} alt="Ushi Icon" className="mini-profile__icon" />
                <img src={settings_icon} alt="Settings Icon" className="mini-profile__icon" />
            </div>

        </div>
    );
};

export default MiniProfile;
