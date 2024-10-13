import React, { useEffect, useRef } from 'react';
import { FaReply, FaEdit, FaThumbtack, FaCopy, FaShare, FaTrashAlt } from 'react-icons/fa';
import './messageMenu.css';

const MessageMenu = ({ x, y, onClose, show }) => {
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className={`edit__message__menu ${show ? 'show' : ''}`}
            style={{ top: y, left: x }}
            onMouseLeave={onClose}
        >
            <ul className="edit__message__list">
                <li className="edit__message__item">
                    <FaReply className="edit__message__icon" /> Ответить
                </li>
                <li className="edit__message__item">
                    <FaEdit className="edit__message__icon" /> Изменить
                </li>
                <li className="edit__message__item">
                    <FaThumbtack className="edit__message__icon" /> Закрепить
                </li>
                <li className="edit__message__item">
                    <FaCopy className="edit__message__icon" /> Копировать текст
                </li>
                <li className="edit__message__item">
                    <FaShare className="edit__message__icon" /> Переслать
                </li>
                <li className="edit__message__item">
                    <FaTrashAlt className="edit__message__icon" /> Удалить
                </li>
            </ul>
        </div>
    );
};

export default MessageMenu;
