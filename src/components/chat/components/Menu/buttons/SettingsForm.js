import React from 'react';
import './SettingsForm.css';

const SettingsForm = ({ settings, handleSettingsChange }) => {
  return (
    <div className="settings-form">
      <div className="form-group">
        <label htmlFor="username">Имя пользователя</label>
        <input
          type="text"
          id="username"
          name="username"
          value={settings.username}
          onChange={handleSettingsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Номер телефона</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={settings.phone}
          onChange={handleSettingsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Адрес электронной почты</label>
        <input
          type="email"
          id="email"
          name="email"
          value={settings.email}
          onChange={handleSettingsChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bio">О себе</label>
        <textarea
          id="bio"
          name="bio"
          value={settings.bio}
          onChange={handleSettingsChange}
        />
      </div>
    </div>
  );
};

export default SettingsForm;