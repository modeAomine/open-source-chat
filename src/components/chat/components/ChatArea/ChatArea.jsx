import React, { useState, useRef, useEffect } from 'react';
import './chatArea.css';
import { FaPaperPlane, FaPaperclip, FaChevronLeft, FaSearch, FaPhone, FaEllipsisV } from 'react-icons/fa';
import VoiceVideoButton from './buttons/ui/VoiceOrVideoButton';
import { chat, getChatMessages } from '../../../service/api.ts';
import MessageMenu from './buttons/ui/MessageMenu.jsx';

const ChatArea = ({ friend, onClose, currentUser }) => {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (friend) {
            const ws = chat(friend.friend_id);
            setSocket(ws);

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    setMessages((prevMessages) => [...prevMessages, message]);
                } catch (error) {
                    console.error("Ошибка при разборе JSON:", error);
                }
            };

            ws.onerror = (error) => {
                console.error("Ошибка WebSocket:", error);
            };

            ws.onclose = (event) => {
                console.log("WebSocket соединение закрыто:", event);
                setSocket(null);
            };

            return () => {
                ws.close();
            };
        }
    }, [friend]);

    useEffect(() => {
        if (friend && friend.chat.chat_id) {
            getChatMessages(friend.chat.chat_id).then((loadedMessages) => {
                loadedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                setMessages(loadedMessages);
            }).catch((error) => {
                console.error("Ошибка при загрузке сообщений:", error);
            });
        }
    }, [friend]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (timestamp) => {
        if (!timestamp) return 'Invalid date';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && socket) {
            const messageData = {
                text: newMessage,
                sender_id: currentUser.id,
                recipient_id: friend.id,
                time: new Date().toISOString(),
            };

            console.log('Отправляем сообщение: ', messageData);

            socket.send(JSON.stringify(messageData));
            setNewMessage('');
        }
    };

    const handleRightClick = (e, message) => {
        e.preventDefault();
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setSelectedMessage(message);
        setContextMenuVisible(true);
    };

    const closeContextMenu = () => {
        setContextMenuVisible(false);
        setSelectedMessage(null);
    };

    if (!friend) {
        return (
            <div className="chat__area">
                <div className="close__chat__area">
                    Выберите друга для начала чата
                </div>
            </div>
        );
    }

    return (
        <div className="chat__area">

            {/* Chat Header */}
            <div className="chat__header">
                <button className="close-chat-button" onClick={onClose}>
                    <FaChevronLeft />
                </button>
                <div className='container__content-left'>
                    <div className="avatar__container">
                        <div className={`status__indicator ${friend.isOnline ? 'online' : 'offline'}`}></div>
                        <img src={friend.filename || 'https://via.placeholder.com/50'} alt={friend.username} className="avatar__open_chat" />
                    </div>
                </div>
                <div className='header__user__item'>
                    <div className="name">{friend.username}</div>
                    <div className='activity'>{friend.activity || 'online'}</div>
                </div>
                <div className="chat__header__icons">
                    <button className="chat__header__icon">
                        <FaSearch />
                    </button>
                    <button className="chat__header__icon">
                        <FaPhone />
                    </button>
                    <button className="chat__header__icon">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="messages">
                {messages.length === 0 ? (
                    <div className="no-messages">Сообщений пока нет.</div>
                ) : (
                    messages.map((message, index) => {
                        const isCurrentUser = String(message.sender_id) === String(currentUser.id);
                        const messageClass = isCurrentUser ? 'my-message' : 'friend-message';

                        return (
                            <div
                                key={index}
                                className={`message ${messageClass}`}
                            >
                                {!isCurrentUser && (
                                    <img
                                        src={friend.filename || 'https://via.placeholder.com/50'}
                                        alt={friend.username}
                                        className="message__avatar"
                                    />
                                )}
                                <div
                                    className="message__content"
                                    onContextMenu={(e) => handleRightClick(e, message)}
                                >
                                    <div className="message__text">{message.text}</div>
                                    <div className="message__time">{formatTime(message.timestamp)}</div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />

                {/* MessageMenu */}
                {contextMenuVisible && (
                    <MessageMenu
                        x={menuPosition.x}
                        y={menuPosition.y}
                        onClose={closeContextMenu}
                        show={contextMenuVisible}
                        message={selectedMessage}
                    />
                )}
            </div>

            {/* Input Area */}
            <div className="chat__input-container">
                <button className="attach__button">
                    <FaPaperclip className="attach__icon" />
                </button>
                <input
                    type="text"
                    placeholder="Отправить сообщение"
                    className="chat__input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="send__button" onClick={handleSendMessage}>
                    <FaPaperPlane className="send__icon" />
                </button>

                {/* Voice/Video Button */}
                <VoiceVideoButton />
            </div>
        </div>
    );
};

export default ChatArea;
