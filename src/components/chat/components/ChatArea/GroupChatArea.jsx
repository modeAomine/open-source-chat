import React, { useState, useRef, useEffect } from 'react';
import './ui/chatArea.css';
import './ui/groupChatArea.css';
import { FaPaperPlane, FaPaperclip, FaChevronLeft, FaSearch, FaPhone, FaEllipsisV } from 'react-icons/fa';
import VoiceVideoButton from './buttons/VoiceOrVideoButton.jsx';
import { chat_rooms, getChatRoomMessages } from '../../../service/api.ts';
import MessageMenu from './buttons/MessageMenu.jsx';

const GroupChatArea = ({ groupChat, onClose, currentUser }) => {
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
        if (groupChat) {
            const ws = chat_rooms(groupChat.group_chat_id);
            setSocket(ws);

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    console.log("Новое сообщение от WebSocket:", message);
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
    }, [groupChat]);

    useEffect(() => {
        if (groupChat?.group_chat_id) {
            getChatRoomMessages(groupChat.group_chat_id)
                .then((loadedMessages) => {
                    loadedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    setMessages(loadedMessages);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке сообщений:", error);
                });
        }
    }, [groupChat]);

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
                type: 'send_message',
                text: newMessage,
                sender_id: currentUser.id,
                group_chat_id: groupChat.group_chat_id,
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

    if (!groupChat) {
        return (
            <div className="chat__area">
                <div className="close__chat__area">
                    Выберите группу для начала чата
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
                    <div className='avatar__container'>
                        <img src={groupChat.filename || 'https://via.placeholder.com/50'} alt={groupChat?.group_chat_id} className="avatar__open_chat" />
                    </div>
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
                        const messageClass = isCurrentUser ? 'my-message' : 'group-message';

                        return (
                            <div key={index} className={`message-group ${messageClass}`}>
                                <div className='message-user__avatar'>
                                    <img
                                        src={message.sender && message.sender.filename ? message.sender.filename : 'https://via.placeholder.com/50'}
                                        alt={`${message.sender.username}'s avatar`}
                                    />
                                    <div className='message-user__username'>{message.sender.username}</div>
                                    <div className='message-user__time'>{formatTime(message.timestamp)}</div>
                                    <div className="message-group__content" onContextMenu={(e) => handleRightClick(e, message)}>
                                        <div className="message-group__text">{message.text}</div>
                                    </div>
                                </div>
                            </div>

                        );
                    })
                )}
                <div ref={messagesEndRef} />
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
    );
};

export default GroupChatArea;