import React, { useState } from 'react';
import { FaUserPlus, FaCommentDots, FaTimes } from 'react-icons/fa';
import './userModal.css';
import { add_friends } from '../../../../service/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserModal = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState('friends');
    const [isLoading, setIsLoading] = useState(false);

    if (!user) return null;

    const handleAddFriend = async () => {
        try {
            setIsLoading(true);
            await add_friends(user.id);
            toast.success(`Запрос на добавление в друзья отправлен: ${user.username}`);
            onClose();
        } catch (friendError) {
            toast.error(`Ошибка: ${friendError.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChat = () => {
        console.log(`Открыть чат с ${user.username}`);
        onClose();
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'friends':
                return <i>Список общих друзей</i>;
            case 'servers':
                return <i>Список общих серверов</i>;
            case 'groups':
                return <i>Список общих групп</i>;
            case 'activity':
                return <i>Последняя активность</i>;
            default:
                return null;
        }
    };

    return (
        <div className="modal-overlay__search-user" onClick={onClose}>
            <div className="modal-content__search-user" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes />
                </button>
                <div className='modal-username__search-user'>
                    <h2>{user.username}</h2>
                </div>
                <img
                    src={user.filename ? user.filename : 'https://via.placeholder.com/50'}
                    className="modal-avatar__search-user"
                    alt={user.username}
                />

                <div className="modal-actions__search-user">
                    <button onClick={handleAddFriend} className="modal-action-button" disabled={isLoading}>
                        {isLoading ? 'Добавляем...' : <><FaUserPlus /> Добавить в друзья</>}
                    </button>
                    <button onClick={handleOpenChat} className="modal-action-button">
                        <FaCommentDots /> Открыть чат
                    </button>
                </div>

                {/* Вкладки */}
                <div className="modal-tabs__search-user">
                    <button
                        className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
                        onClick={() => setActiveTab('friends')}
                    >
                        Общие друзья
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'servers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('servers')}
                    >
                        Общие сервера
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'groups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('groups')}
                    >
                        Общие группы
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activity')}
                    >
                        Активность
                    </button>
                </div>

                {/* Контент вкладок */}
                <div className="modal-tab-content__search-user">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default UserModal;