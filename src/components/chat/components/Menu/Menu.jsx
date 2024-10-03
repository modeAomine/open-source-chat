import React, { useEffect, useState } from 'react';
import './menu.css';
import { FaUser, FaBell, FaLock, FaComments, FaGlobe, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import ProfileModal from '../ProfileModel/ProfileModal.jsx';
import { useTranslation } from 'react-i18next';
import EditFieldModal from '../ProfileModel/button/ui/EditFieldModal.jsx';
import PrivacyAndSecuritySettings from '../PrivateAndSecurity/PrivacyAndSecuritySettings.jsx';
import LanguageSettings from '../LaunguageSettings/LanguageSettings.jsx';
import { useAuth } from '../../../middleware/AuthContext.jsx';

const Menu = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditFieldModalOpen, setEditFieldModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const { user, logout, setUser, fetchUser } = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (accessToken && refreshToken && !user) {
      fetchUser(accessToken, refreshToken);
    }
  }, [fetchUser, user]);

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

  const openPrivacyModal = () => setPrivacyModalOpen(true);
  const closePrivacyModal = () => setPrivacyModalOpen(false);

  const openLanguageModal = () => setLanguageModalOpen(true);
  const closeLanguageModal = () => setLanguageModalOpen(false);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAvatarChange = (file) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: URL.createObjectURL(file),
    }));
  };

  const defaultAvatar = 'https://via.placeholder.com/50';

  return (
    <>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        {user ? (
          <div className="user-profile">
            <img src={user.avatar || defaultAvatar} alt="User" className="menu__avatar" />
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div className="email">{user.email}</div>
            </div>
          </div>
        ) : (
          <div className="user-profile">
            <div className="user-info">
              <div className="name">Загрузка...</div>
            </div>
          </div>
        )}
        <ul>
          <li onClick={openProfileModal}>
            <FaUser className="icon" /> {t('Мой профиль')}
          </li>
          <li onClick={() => alert(t('Уведомления'))}>
            <FaBell className="icon" /> {t('Уведомления')}
          </li>
          <li onClick={openPrivacyModal}>
            <FaLock className="icon" /> {t('Приватность и защита')}
          </li>
          <li onClick={() => alert(t('Настройки чата'))}>
            <FaComments className="icon" /> {t('Настройки чата')}
          </li>
          <li onClick={openLanguageModal}>
            <FaGlobe className="icon" /> {t('Язык')}
          </li>
          <li onClick={logout}>
            <FaSignOutAlt className="icon" /> {t('Выйти')}
          </li>
        </ul>
      </div>

      {isProfileModalOpen && (
        <ProfileModal
          user={user}
          onClose={closeProfileModal}
          onEditField={openEditFieldModal}
          onAvatarChange={handleAvatarChange}
          setUser={setUser}
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

      {isPrivacyModalOpen && (
        <PrivacyAndSecuritySettings
          onClose={closePrivacyModal}
        />
      )}

      {isLanguageModalOpen && (
        <LanguageSettings
          onClose={closeLanguageModal}
        />
      )}
    </>
  );
};

export default Menu;
