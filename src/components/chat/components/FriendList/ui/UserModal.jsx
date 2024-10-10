import React, { useState } from 'react';
import { FaUserPlus, FaUserTimes, FaLock, FaUnlock, FaEllipsisV, FaCommentDots, FaTimes } from 'react-icons/fa'; //FaUserSlash, FaUserCheck,
import './userModal.css';
import { add_friends } from '../../../../service/api'; //, block_user, unblock_user, remove_friend
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserModal = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState('friends');
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleRemoveFriend = async () => {
        try {
            setIsLoading(true);
            // await remove_friend(user.id);
            toast.success(`Пользователь удален из друзей: ${user.username}`);
            onClose();
        } catch (removeError) {
            toast.error(`Ошибка: ${removeError.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBlockUser = async () => {
        try {
            setIsLoading(true);
            // await block_user(user.id);
            toast.success(`Пользователь заблокирован: ${user.username}`);
            onClose();
        } catch (blockError) {
            toast.error(`Ошибка: ${blockError.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnblockUser = async () => {
        try {
            setIsLoading(true);
            // await unblock_user(user.id);
            toast.success(`Пользователь разблокирован: ${user.username}`);
            onClose();
        } catch (unblockError) {
            toast.error(`Ошибка: ${unblockError.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChat = () => {
        console.log(`Открыть чат с ${user.username}`);
        onClose();
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const renderPrimaryAction = () => {
        if (user.status === 'friends') {
            return (
                <button onClick={handleRemoveFriend} className="modal-action-button" disabled={isLoading}>
                    {isLoading ? 'Удаляем...' : <><FaUserTimes /> Удалить из друзей</>}
                </button>
            );
        } else if (user.status === 'blocked') {
            return (
                <button onClick={handleUnblockUser} className="modal-action-button" disabled={isLoading}>
                    {isLoading ? 'Разблокируем...' : <><FaUnlock /> Разблокировать</>}
                </button>
            );
        } else if (user.status === 'pending') {
            return (
                <button onClick={handleAddFriend} className="modal-action-button" disabled={isLoading}>
                    {isLoading ? 'Добавляем...' : <><FaUserPlus /> Добавить в друзья</>}
                </button>
            );
        } else {
            return (
                <button onClick={handleAddFriend} className="modal-action-button" disabled={isLoading}>
                    {isLoading ? 'Добавляем...' : <><FaUserPlus /> Добавить в друзья</>}
                </button>
            );
        }
    };

    // const renderSecondaryActions = () => {
    //     return (
    //         <>
    //             <button onClick={handleBlockUser} className="modal-action-button" disabled={isLoading}>
    //                 <FaLock /> Заблокировать
    //             </button>
    //         </>
    //     );
    // };

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
                    {renderPrimaryAction()}
                    <button onClick={handleOpenChat} className="modal-action-button">
                        <FaCommentDots /> Открыть чат
                    </button>
                </div>

                <div className="modal-secondary-actions__search-user">
                    <button className="modal-action-button-more" onClick={toggleDropdown}>
                        <FaEllipsisV />
                    </button>
                    {showDropdown && (
                        <div className="dropdown-actions">
                            <button onClick={handleBlockUser} className="modal-action-button" disabled={isLoading}>
                                <FaLock /> Заблокировать
                            </button>
                            {/* Другие действия можно добавить сюда */}
                        </div>
                    )}
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
                    {activeTab === 'friends' && <i>Список общих друзей</i>}
                    {activeTab === 'servers' && <i>Список общих серверов</i>}
                    {activeTab === 'groups' && <i>Список общих групп</i>}
                    {activeTab === 'activity' && <i>Последняя активность</i>}
                </div>
            </div>
        </div>
    );
};

export default UserModal;