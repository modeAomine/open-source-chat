import React from 'react';
import './ProfileModal.css';
import { FaUser, FaPhone, FaAt } from 'react-icons/fa';

const ProfileModal = ({ user, onClose, onEditField }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Мой профиль</h2>
        <div className="user-details">
          <img src={user.avatar} alt="User" className="avatar" onClick={() => onEditField('avatar')} />
          <div className="bio">{user.bio}</div>
          <div className="user-info">
            <div className="info-item">
              <FaUser className="icon" />
              <span className="label">Имя:</span>
              <div className="name" onClick={() => onEditField('name')}>{user.name}</div>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <span className="label">Телефон:</span>
              <div className="phone" onClick={() => onEditField('phone')}>{user.phone}</div>
            </div>
            <div className="info-item">
              <FaAt className="icon" />
              <span className="label">Username:</span>
              <div className="username" onClick={() => onEditField('username')}>{user.username}</div>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ProfileModal;