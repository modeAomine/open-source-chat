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
    console.error('Ошибка получения пользователя:', error);
    throw new Error('Ошибка получения пользователя из (data)');
  }
};

export const refresh_token = async (refreshToken) => {
  try {
    const response = await axios.post(url + '/token/refresh', {
      refresh_token: refreshToken
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка обновления refresh_token');
  }
};