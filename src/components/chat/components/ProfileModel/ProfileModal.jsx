import React, { useState } from 'react';
import './ProfileModal.css';
import { FaUser, FaPhone, FaAt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProfileModal = ({ user, onClose, onEditField, onAvatarChange }) => {
  const { t } = useTranslation();
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(URL.createObjectURL(file));
      onAvatarChange(file);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{t('Мой профиль')}</h2>
        <div className="user-details">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img src={avatarFile || user.avatar} alt="User" className="avatar" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <div className="bio">{user.bio}</div>
          <div className="user-info">
            <div className="info-item">
              <FaUser className="icon" />
              <span className="label">{t('Имя')}:</span>
              <div className="name" onClick={() => onEditField('name')}>{user.name}</div>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <span className="label">{t('Телефон')}:</span>
              <div className="phone" onClick={() => onEditField('phone')}>{user.phone}</div>
            </div>
            <div className="info-item">
              <FaAt className="icon" />
              <span className="label">{t('Username')}:</span>
              <div className="username" onClick={() => onEditField('username')}>{user.username}</div>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>{t('Закрыть')}</button>
      </div>
    </div>
  );
};

export default ProfileModal;