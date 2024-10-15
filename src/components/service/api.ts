export const chat = (friend_id: string) => {
    const access_token = localStorage.getItem('access_token');
    const socket = new WebSocket(`ws://127.0.0.1:8000/socket/ws/chat/${friend_id}?token=${access_token}`);

    socket.onopen = () => {
        console.log("WebSocket соединение установлено");
        console.log(friend_id)
    };

    socket.onmessage = (event) => {
        console.log("Новое сообщение:", event.data);
    };

    socket.onclose = (event) => {
        console.log("WebSocket соединение закрыто:", event);
    };

    socket.onerror = (error) => {
        console.error("Ошибка WebSocket:", error);
    };

    return socket;
};

export const chat_rooms = (group_chat_id: string) => {
    const accessToken = localStorage.getItem('access_token')
    const socket = new WebSocket(`ws://127.0.0.1:8000/socket/ws/group_chat/${group_chat_id}?token=${accessToken}`);

    socket.onopen = () => {
        console.log("Соеденение: True")
        console.log(group_chat_id)
    }

    socket.onmessage = (event) => {
        console.log("Новое сообщение: ", event.data)
    }

    socket.onclose = (event) => {
        console.log("Соеденение: False", event)
    }

    socket.onerror = (error) => {
        console.log("Error: ", error)
    }

    return socket
}

export const getChatMessages = async (chat_id: string) => {
    const token = localStorage.getItem('access_token');
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/get/chat_message/${chat_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка ответа:', errorText);
            throw new Error('Ошибка при загрузке сообщений');
        }
        return response.json();
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
};

export const getChatRoomMessages = async (group_chat_id: string) => {
    const token = localStorage.getItem('access_token')
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/get/group_chat_message/${group_chat_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка ответа: ', errorText)
            throw new Error('Ошибка при загрузке сообщений групового чата')
        }
        return response.json()
    } catch (error) {
        console.error('Ошибка запроса: ', error)
        throw error;
    }
}

