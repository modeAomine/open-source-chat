import axios from 'axios';

let url;

if (process.env.REACT_APP_ENV === 'debug') {
  url = 'http://127.0.0.1:8000';
} else {
  url = 'api/';
}

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(url + '/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка регистрации');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(url + '/auth/login', userData);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка авторизации');
  }
};

export const logout = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.post(url + '/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка выхода');
  }
};

export const current_user = async (accessToken) => {
  try {
    const response = await axios.get(url + '/user/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка получения пользователя: ' + error.response?.data?.detail || error.message);
  }
};

export const refresh_token = async (refreshToken) => {
  try {
    const response = await axios.post(url + '/token/refresh', {
      refresh_token: refreshToken
    }, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });

    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка обновления refresh_token: ' + error.response.data.detail);
  }
};

export const update_user_field = async (field, newValue, accessToken) => {
  const response = await axios.patch(`${url}/user/edit_user`, {
    field: field,
    value: newValue,
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.data;
};

export const user_avatar = async (file, accessToken) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${url}/user/upload_avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузки аватарки пользователя: ' + error.response.data.detail);
  }
};

export const get_user_avatar = async (user_id, accessToken) => {
  try {
    const response = await axios.get(`${url}/user/user/${user_id}/avatar`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении аватарки пользователя: ' + error.response.data.detail);
  }
}

export const add_friends = async (user_id) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.post(`${url}/friends/add_friend/${user_id}`, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (friendError) {
    throw new Error('Ошибка при добавление в друзья: ' + friendError.response.data.detail)
  }
}

export const confirm_add_friend = async (user_id) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.post(`${url}/confirm_friendship/${user_id}`, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при подтверждение дружбы: ' + error.response.data.detail)
  }
}

export const get_status_friend = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${url}/friends/friendships`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка получения пользователей pending: ' + error.response.data.detail)
  }
}


export const search_user = async (searchTerm) => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://127.0.0.1:8000/socket/ws/users')

    socket.onopen = () => {
      socket.send(searchTerm)
    }

    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      const result = JSON.parse(event.data)
      resolve(result)
      socket.close()
    }

    socket.onerror = (error) => {
      console.error('WebSocket error: ', error)
      reject('Произошла ошибка при подключение к серверу')
    }

    socket.onclose = () => {
      console.log('WebSocket connection close')
    }
  })
}