import React, { useState } from 'react';
import './menu.css';
import { FaUser, FaBell, FaLock, FaComments, FaGlobe } from 'react-icons/fa';
import ProfileModal from '../ProfileModel/ProfileModel.js';
import EditFieldModal from '../ProfileModel/EditFieldModal.js';

const Menu = ({ isOpen, onClose }) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditFieldModalOpen, setEditFieldModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const [user, setUser] = useState({
    name: 'Имя пользователя',
    phone: '+7 123 456 78 90',
    username: 'username',
    bio: 'Привет! Я пользователь этого чата.',
    avatar: 'https://via.placeholder.com/50',
  });

  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  const openEditFieldModal = (field) => {
    setEditingField(field);
    setEditFieldModalOpen(true);
  };

  const closeEditFieldModal = () => {
    setEditingField(null);
    setEditFieldModalOpen(false);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="user-profile">
          <img src={user.avatar} alt="User" className="avatar" />
          <div className="user-info">
            <div className="name">{user.name}</div>
            <div className="email">{user.username}</div>
          </div>
        </div>
        <ul>
          <li onClick={openProfileModal}>
            <FaUser className="icon" /> Мой профиль
          </li>
          <li onClick={() => alert('Уведомления')}>
            <FaBell className="icon" /> Уведомления
          </li>
          <li onClick={() => alert('Приватность и защита')}>
            <FaLock className="icon" /> Приватность и защита
          </li>
          <li onClick={() => alert('Настройки чата')}>
            <FaComments className="icon" /> Настройки чата
          </li>
          <li onClick={() => alert('Язык')}>
            <FaGlobe className="icon" /> Язык
          </li>
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>

      {isProfileModalOpen && (
        <ProfileModal
          user={user}
          onClose={closeProfileModal}
          onEditField={openEditFieldModal}
        />
      )}

      {isEditFieldModalOpen && (
        <EditFieldModal
          field={editingField}
          value={user[editingField]}
          onClose={closeEditFieldModal}
          onSave={handleFieldChange}
        />
      )}
    </>
  );
};

export default Menu;