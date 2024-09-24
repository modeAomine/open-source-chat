import React from 'react';
import './ProfileModal.css';

const ProfileModal = ({ user, onClose, onEditField }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Мой профиль</h2>
        <div className="user-details">
          <img src={user.avatar} alt="User" className="avatar" onClick={() => onEditField('avatar')} />
          <div className="bio">{user.bio}</div>
          <div className="user-info">
            <div className="name" onClick={() => onEditField('name')}>{user.name}</div>
            <div className="phone" onClick={() => onEditField('phone')}>{user.phone}</div>
            <div className="username" onClick={() => onEditField('username')}>{user.username}</div>
          </div>
        </div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ProfileModal;