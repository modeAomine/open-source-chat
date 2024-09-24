import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL вашего FastAPI сервера
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};