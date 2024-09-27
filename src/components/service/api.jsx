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
    throw new Error('Registration failed');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(url + '/auth/login', userData);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
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
  } catch {
    throw new Error('Logout failed');
  }
};