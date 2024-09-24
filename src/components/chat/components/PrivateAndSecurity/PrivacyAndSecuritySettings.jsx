import React, { useState } from 'react';
import './PrivacyAndSecuritySettings.css';
import { useTranslation } from 'react-i18next';

const PrivacyAndSecuritySettings = ({ onClose }) => {
  const { t } = useTranslation();
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const [messageDeletionTime, setMessageDeletionTime] = useState('1 hour');
  const [localPassword, setLocalPassword] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [phoneVisibility, setPhoneVisibility] = useState('everyone');
  const [lastSeenVisibility, setLastSeenVisibility] = useState('everyone');
  const [profilePhotoVisibility, setProfilePhotoVisibility] = useState('everyone');
  const [bioVisibility, setBioVisibility] = useState('everyone');
  const [messagePermissions, setMessagePermissions] = useState('everyone');
  const [callPermissions, setCallPermissions] = useState('everyone');
  const [chatInvitations, setChatInvitations] = useState('everyone');

  const handleTwoStepVerificationChange = () => {
    setTwoStepVerification(!twoStepVerification);
  };

  const handleMessageDeletionTimeChange = (event) => {
    setMessageDeletionTime(event.target.value);
  };

  const handleLocalPasswordChange = (event) => {
    setLocalPassword(event.target.value);
  };

  const handleBlockedUsersChange = (event) => {
    setBlockedUsers(event.target.value.split(',').map(user => user.trim()));
  };

  const handleVisibilityChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <div className="privacy-modal-overlay">
      <div className="privacy-modal-content">
        <h2 className="privacy-modal-title">{t('Приватность и защита')}</h2>
        <div className="privacy-scrollable-content">
          <div className="privacy-section">
            <h3>{t('Двойная верификация')}</h3>
            <label>
              <input
                type="checkbox"
                checked={twoStepVerification}
                onChange={handleTwoStepVerificationChange}
              />
              {t('Включить двойную верификацию')}
            </label>
          </div>
          <div className="privacy-section">
            <h3>{t('Авто удаление сообщений')}</h3>
            <select value={messageDeletionTime} onChange={handleMessageDeletionTimeChange}>
              <option value="1 hour">{t('1 час')}</option>
              <option value="3 hours">{t('3 часа')}</option>
              <option value="6 hours">{t('6 часов')}</option>
              <option value="12 hours">{t('12 часов')}</option>
            </select>
          </div>
          <div className="privacy-section">
            <h3>{t('Локальный пароль')}</h3>
            <input
              type="password"
              value={localPassword}
              onChange={handleLocalPasswordChange}
              placeholder={t('Введите пароль')}
            />
          </div>
          <div className="privacy-section">
            <h3>{t('Заблокированные пользователи')}</h3>
            <input
              type="text"
              value={blockedUsers.join(', ')}
              onChange={handleBlockedUsersChange}
              placeholder={t('Введите имена пользователей через запятую')}
            />
          </div>
          <div className="privacy-section">
            <h3>{t('Настройки приватности')}</h3>
            <div className="privacy-option">
              <label>{t('Номер телефона')}:</label>
              <select value={phoneVisibility} onChange={(e) => handleVisibilityChange(e, setPhoneVisibility)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
            <div className="privacy-option">
              <label>{t('Last seen & online')}:</label>
              <select value={lastSeenVisibility} onChange={(e) => handleVisibilityChange(e, setLastSeenVisibility)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
            <div className="privacy-option">
              <label>{t('Фото профиля')}:</label>
              <select value={profilePhotoVisibility} onChange={(e) => handleVisibilityChange(e, setProfilePhotoVisibility)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
            <div className="privacy-option">
              <label>{t('О себе')}:</label>
              <select value={bioVisibility} onChange={(e) => handleVisibilityChange(e, setBioVisibility)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
          </div>
          <div className="privacy-section">
            <h3>{t('Доступ к сообщениям и звонкам')}</h3>
            <div className="privacy-option">
              <label>{t('Кто может отправлять сообщения')}:</label>
              <select value={messagePermissions} onChange={(e) => handleVisibilityChange(e, setMessagePermissions)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
            <div className="privacy-option">
              <label>{t('Кто может звонить')}:</label>
              <select value={callPermissions} onChange={(e) => handleVisibilityChange(e, setCallPermissions)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
          </div>
          <div className="privacy-section">
            <h3>{t('Приглашения в чаты/каналы')}</h3>
            <div className="privacy-option">
              <label>{t('Кто может приглашать в чаты/каналы')}:</label>
              <select value={chatInvitations} onChange={(e) => handleVisibilityChange(e, setChatInvitations)}>
                <option value="everyone">{t('Все')}</option>
                <option value="contacts">{t('Контакты')}</option>
                <option value="nobody">{t('Никто')}</option>
              </select>
            </div>
          </div>
        </div>
        <button className="privacy-close-button" onClick={onClose}>{t('Закрыть')}</button>
      </div>
    </div>
  );
};

export default PrivacyAndSecuritySettings;