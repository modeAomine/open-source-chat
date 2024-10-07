import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, current_user, refresh_token, get_user_avatar } from '../service/api.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(false);
    const [tokensChecked, setTokensChecked] = useState(false);
    const navigate = useNavigate();

    const performLogout = useCallback(async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Ошибка выхода:', error);
        } finally {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        }
    }, [navigate]);

    const fetchUser = useCallback(async (accessToken) => {
        if (isFetchingUser || user) return;
        setIsFetchingUser(true);
        try {
            const userData = await current_user(accessToken);
            console.log(userData)
            let avatar = null;
            try {
                avatar = await get_user_avatar(userData.id, accessToken)
            } catch(avatarError) {
                console.log('Ошибка получение аватарки пользователя: ', avatarError)
            }
            setUser({...userData, avatar});
            setIsAuthenticated(true);
            navigate('/chat');
        } catch (error) {
            console.error('Ошибка получения данных пользователя:', error);
            if (error.response && error.response.status === 401) {
                console.log('Токен истек, пробуем обновить его...');
                await handleTokenRefresh();
            } else {
                performLogout();
            }
        } finally {
            setIsFetchingUser(false);
        }
    }, [isFetchingUser, user, navigate, performLogout]);

    const handleTokenRefresh = useCallback(async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.log('Refresh token отсутствует, выполняем выход из системы.');
            return performLogout();
        }

        try {
            console.log('Обновление токена...');
            const newTokens = await refresh_token(refreshToken);
            if (newTokens?.access_token) {
                console.log('Токен обновлен:', newTokens.access_token);
                localStorage.setItem('access_token', newTokens.access_token);
                fetchUser(newTokens.access_token);
            } else {
                throw new Error('Токен не обновлен.');
            }
        } catch (refreshError) {
            console.error('Ошибка обновления токена:', refreshError);
            if (refreshError.response && refreshError.response.status === 401) {
                console.log('Refresh token истек, выполняем выход.');
                return performLogout();
            }
            performLogout();
        }
    }, [performLogout, fetchUser]);

    const login = async (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setIsAuthenticated(true);
        fetchUser(accessToken);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (!tokensChecked) {
            if (accessToken && refreshToken && !isAuthenticated) {
                fetchUser(accessToken);
            } else if (!accessToken && refreshToken) {
                handleTokenRefresh();
            }
            setTokensChecked(true);
        }
    }, [fetchUser, tokensChecked, isAuthenticated, handleTokenRefresh]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout: performLogout, user, setUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);