import React, { useState, useEffect } from 'react';
import './LanguageSettings.css';
import { useTranslation } from 'react-i18next';

const LanguageSettings = ({ onClose }) => {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    localStorage.setItem('appLanguage', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="language-modal-overlay">
      <div className="language-modal-content">
        <h2 className="language-modal-title">{t('Выбор языка')}</h2>
        <div className="language-section">
          <label htmlFor="language-select">{t('Выберите язык')}:</label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="ru">{t('Русский')}</option>
            <option value="en">{t('Английский')}</option>
            <option value="es">{t('Испанский')}</option>
            <option value="fr">{t('Французский')}</option>
          </select>
        </div>
        <button className="language-close-button" onClick={onClose}>{t('Закрыть')}</button>
      </div>
    </div>
  );
};

export default LanguageSettings;