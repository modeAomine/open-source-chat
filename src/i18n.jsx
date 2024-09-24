import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Мой профиль": "My Profile",
      "Уведомления": "Notifications",
      "Приватность и защита": "Privacy and Security",
      "Настройки чата": "Chat Settings",
      "Язык": "Language",
      "Закрыть": "Close",
      "Выбор языка": "Language Selection",
      "Выберите язык": "Select Language",
      "Русский": "Russian",
      "Английский": "English",
      "Испанский": "Spanish",
      "Французский": "French",
    }
  },
  ru: {
    translation: {
      "Мой профиль": "Мой профиль",
      "Уведомления": "Уведомления",
      "Приватность и защита": "Приватность и защита",
      "Настройки чата": "Настройки чата",
      "Язык": "Язык",
      "Закрыть": "Закрыть",
      "Выбор языка": "Выбор языка",
      "Выберите язык": "Выберите язык",
      "Русский": "Русский",
      "Английский": "Английский",
      "Испанский": "Испанский",
      "Французский": "Французский",
    }
  },
  es: {
    translation: {
      "Мой профиль": "Mi Perfil",
      "Уведомления": "Notificaciones",
      "Приватность и защита": "Privacidad y Seguridad",
      "Настройки чата": "Configuración del Chat",
      "Язык": "Idioma",
      "Закрыть": "Cerrar",
      "Выбор языка": "Selección de Idioma",
      "Выберите язык": "Seleccione el Idioma",
      "Русский": "Ruso",
      "Английский": "Inglés",
      "Испанский": "Español",
      "Французский": "Francés",
    }
  },
  fr: {
    translation: {
      "Мой профиль": "Mon Profil",
      "Уведомления": "Notifications",
      "Приватность и защита": "Confidentialité et Sécurité",
      "Настройки чата": "Paramètres du Chat",
      "Язык": "Langue",
      "Закрыть": "Fermer",
      "Выбор языка": "Sélection de Langue",
      "Выберите язык": "Sélectionnez la Langue",
      "Русский": "Russe",
      "Английский": "Anglais",
      "Испанский": "Espagnol",
      "Французский": "Français",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('appLanguage') || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;