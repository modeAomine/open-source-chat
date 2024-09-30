import React, { useState } from 'react';
import './ProfileModal.css';
import { FaUser, FaPhone, FaAt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import EditFieldModal from './button/ui/EditFieldModal';
import { update_user_field } from '../../../service/api';

const ProfileModal = ({ user, setUser, onClose, onAvatarChange }) => {
    const { t } = useTranslation();
    const [avatarFile, setAvatarFile] = useState(null);
    const [isEditFieldModalOpen, setEditFieldModalOpen] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(URL.createObjectURL(file));
            onAvatarChange(file);
        }
    };

    const handleEditField = (field) => {
        setCurrentField(field);
        setCurrentValue(user[field]);
        setEditFieldModalOpen(true);
    };

    const handleSaveField = async (newValue) => {
      try {
        const token = localStorage.getItem('access_token');
        await update_user_field(user.username, currentField, newValue, token);
        user[currentField] = newValue;
        setUser((prevUser) => ({
          ...prevUser,
          [currentField]: newValue,
        }));
        setEditFieldModalOpen(false);
      } catch (error) {
        console.error('Ошибка при обновлении поля:', error);
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
                            <div className="name" onClick={() => handleEditField('name')}>{user.name}</div>
                        </div>
                        <div className="info-item">
                            <FaPhone className="icon" />
                            <span className="label">{t('Телефон')}:</span>
                            <div className="phone" onClick={() => handleEditField('phone')}>{user.phone}</div>
                        </div>
                        <div className="info-item">
                            <FaAt className="icon" />
                            <span className="label">{t('Username')}:</span>
                            <div className="username" onClick={() => handleEditField('username')}>{user.username}</div>
                        </div>
                    </div>
                </div>
                <button className="close-button" onClick={onClose}>{t('Закрыть')}</button>
            </div>
            {isEditFieldModalOpen && (
                <EditFieldModal
                    field={currentField}
                    value={currentValue}
                    onClose={() => setEditFieldModalOpen(false)}
                    onSave={handleSaveField}
                />
            )}
        </div>
    );
};

export default ProfileModal;