import React, { useEffect, useState } from 'react';
import './ProfileModal.css';
import { FaUser, FaPhone, FaAt, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import EditFieldModal from './button/ui/EditFieldModal';
import { get_user_avatar, update_user_field, user_avatar } from '../../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '../../../../static/default.svg';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useAuth } from '../../../middleware/AuthContext';

const ProfileModal = ({ onClose }) => {
    const { user, setUser } = useAuth();
    const { t } = useTranslation();
    const [avatarFile, setAvatarFile] = useState(null);
    const [isEditFieldModalOpen, setEditFieldModalOpen] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    let fieldName = t(currentField === 'username' ? 'Имя пользователя' : 
                   currentField === 'phone' ? 'Номер телефона' : 
                   currentField === 'name' ? 'Имя' : 
                   currentField === 'bio' ? 'О себе' : 
                   currentField === 'email' ? 'email' : '');

    useEffect(() => {
        let isMounted = true;
        const fetchAvatar = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (accessToken && user?.id) {
                    const urlAvatar = await get_user_avatar(user.id, accessToken);
                    if (isMounted) setAvatarFile(urlAvatar);
                }
            } catch (error) {
                console.error('Ошибка при получении аватарки пользователя: ', error.message);
            }
        };

        fetchAvatar();

        return () => {
            isMounted = false;
        };
    }, [user]);

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        const accessToken = localStorage.getItem('access_token');
        if (file) {
            try {
                await user_avatar(file, accessToken);
                const newAvatarUrl = URL.createObjectURL(file);
                setAvatarFile(newAvatarUrl);
                setUser((prevUser) => ({
                    ...prevUser,
                    avatar: newAvatarUrl,
                }));
                toast.success('Аватарка успешно обновлена.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } catch (error) {
                toast.error('Ошибка при обновлении аватарки.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        }
    };

    const handleEditField = (field) => {
        setCurrentField(field);
        setCurrentValue(user[field]);
        setEditFieldModalOpen(true);
    };

    const handleSaveField = async (newValue) => {
        if (currentField === 'username' && user.username === newValue) {
            toast.error('Новое имя пользователя не может совпадать с текущим.', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        if (currentField === 'phone' && !newValue) {
            toast.error('Пожалуйста, введите корректный номер телефона.', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            await update_user_field(currentField, newValue, token);
            setUser((prevUser) => ({
                ...prevUser,
                [currentField]: newValue,
            }));
            setEditFieldModalOpen(false);
            toast.success(`${fieldName} ${t('success_field_upd')}`, {
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (error) {
            if (error.response?.data?.detail?.error === 'username already taken') {
                toast.error('Имя пользователя уже занято.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                toast.error('Ошибка при обновлении поля.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{t('Мой профиль')}</h2>
                <div className="user-details">
                    <label htmlFor="avatar-upload" className="avatar-label">
                        <img src={avatarFile || user.avatar || Avatar} className="avatar" alt="Аватар" />
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                    />
                    <div className="bio-container">
                        <div className="bio" onClick={() => handleEditField('bio')}>
                            {user.bio ? user.bio : <i>{t('Добавьте информацию о себе')}</i>}
                        </div>
                    </div>
                    <div className="user-info">
                        <div className="info-item">
                            <FaUser className="icon" />
                            <span className="label">{t('Имя')}:</span>
                            <div className="profile__name" onClick={() => handleEditField('name')}>
                                {user.name ? user.name : <i>{t('Добавьте имя пользователя')}</i>}
                            </div>
                        </div>
                        <div className="info-item">
                            <FaEnvelope className="icon" />
                            <span className="label">{t('Email')}:</span>
                            <div className="email" onClick={() => handleEditField('email')}>
                                {user.email ? user.email : <i>{t('Добавить email')}</i>}
                            </div>
                        </div>
                        <div className="info-item">
                            <FaPhone className="icon" />
                            <span className="label">{t('Телефон')}:</span>
                            <div className="phone" onClick={() => handleEditField('phone')}>
                                {user.phone ? user.phone : <i>{t('Добавить номер телефона')}</i>}
                            </div>
                        </div>
                        <div className="info-item">
                            <FaAt className="icon" />
                            <span className="label">{t('Username')}:</span>
                            <div className="username" onClick={() => handleEditField('username')}>
                                {'@' + user.username}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="close-button" onClick={onClose}>{t('Закрыть')}</button>
            </div>
            {isEditFieldModalOpen && (
                <EditFieldModal
                    field={currentField}
                    renderField={() => currentField === 'phone' ? (
                        <PhoneInput value={currentValue} onChange={setCurrentValue} defaultCountry="RU" />
                    ) : (
                        <input type="text" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
                    )}
                    onClose={() => setEditFieldModalOpen(false)}
                    onSave={handleSaveField}
                />
            )}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ProfileModal;
