import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, current_user, refresh_token } from '../service/api.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(false);
    const [tokensChecked, setTokensChecked] = useState(false);  // Новый флаг
    const navigate = useNavigate();

    const logoutUser = useCallback(async () => {
        try {
            await logout();
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    }, [navigate]);

    const fetchUser = useCallback(async (accessToken, refreshToken) => {
        if (isFetchingUser || user) return;  // Не загружаем, если уже идет запрос или пользователь есть
        setIsFetchingUser(true);
        try {
            const userData = await current_user(accessToken);
            setUser(userData);
            setIsAuthenticated(true);
            navigate('/chat');  // Навигация после успешного получения данных
        } catch (error) {
            console.error('Ошибка получения данных пользователя:', error);
            try {
                const newTokens = await refresh_token(refreshToken);
                localStorage.setItem('access_token', newTokens.access_token);
                localStorage.setItem('refresh_token', newTokens.refresh_token);
                const userData = await current_user(newTokens.access_token);
                setUser(userData);
                setIsAuthenticated(true);
                navigate('/chat');  // Навигация после успешного обновления токенов
            } catch (refreshError) {
                console.error('Ошибка обновления токена:', refreshError);
                logoutUser();
            }
        } finally {
            setIsFetchingUser(false);
            setTokensChecked(true);  // Устанавливаем, что проверка токенов завершена
        }
    }, [isFetchingUser, user, navigate, logoutUser]);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (!tokensChecked && accessToken && refreshToken && !isAuthenticated) {
            fetchUser(accessToken, refreshToken);
        }
    }, [fetchUser, tokensChecked, isAuthenticated]);

    const login = async (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setIsAuthenticated(true);
        fetchUser(accessToken, refreshToken);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout: logoutUser, user, setUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);